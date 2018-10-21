import puppeteer from 'puppeteer';
import consola from 'consola';
import fastify from 'fastify';
import cors from 'fastify-cors';
import { join } from 'path';
import staticFiles from 'fastify-static';
import dayjs from 'dayjs';

import scrapers from './scrapers';
import { Job, Company, Log } from './db';

const app = fastify();

app.register(cors, { origin: 'http://192.168.1.38:8080' });
app.register(staticFiles, {
	root: join(__dirname, 'assets'),
	prefix: '/imgs/',
});

app.get('/api/jobs', async _ => {
	return await Job.findAll({ include: [Company] });
});

app.get('/api/jobs/:company', async req => {
	const { company } = req.params;

	if (scrapers[company]) {
		return await Job.findAll({
			include: [{ model: Company, where: { slug: company } }],
		});
	} else {
		throw Error(`No scraper available for ${company}`);
	}
});

app.get('/api/sync', async req => {
	const ip =
		req.headers['x-forwarded-for'] || req.req.connection.remoteAddress;

	const yesterday = dayjs().subtract(1, 'day');
	const latest = await Log.findOne({ order: [['createdAt', 'DESC']] });
	const lastUpdate = latest ? dayjs(latest.createdAt) : null;

	if (lastUpdate && lastUpdate.isAfter(yesterday)) {
		return {
			success: false,
			error: {
				data: {
					lastUpdate,
					timeLeft: lastUpdate
						? lastUpdate.diff(yesterday, 'hours')
						: null,
				},
				message: 'The database can only be updated once every day',
			},
		};
	}

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	for (let company of Object.keys(scrapers)) {
		await scrapers[company](page);
	}

	await browser.close();

	await Log.create({ ip });

	return {
		success: true,
		jobs: await Job.findAll(),
	};
});

// TODO: See how to handle that case, is it really useful?

// app.get('/api/sync/:company', async req => {
// 	const { company } = req.params;

// 	if (scrapers[company]) {
// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage();

// 		await scrapers[company](page);
// 		await browser.close();

// 		return await Job.findAll({
// 			include: [{ model: Company, where: { slug: company } }],
// 		});
// 	} else {
// 		throw Error(`No scraper available for ${company}`);
// 	}
// });

app.listen(3000, (err, address) => {
	if (err) {
		consola.error(err);
		throw Error(err);
	}

	consola.info(`Server listening on ${address}`);
});
