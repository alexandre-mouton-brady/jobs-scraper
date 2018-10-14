import puppeteer from 'puppeteer';
import consola from 'consola';
import fastify from 'fastify';
import cors from 'fastify-cors';
import { DATA_DIR, exists, mkdir, openFile, ASSETS_DIR } from './utils';
import scrapers from './scrapers';
import { Job, Company } from './db';

const app = fastify();

app.register(cors, { origin: 'http://localhost:1234' });

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

app.get('/api/sync', async _ => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	for (let company of Object.keys(scrapers)) {
		await scrapers[company](page);
	}

	await browser.close();

	return await Job.findAll();
});

app.get('/api/sync/:company', async req => {
	const { company } = req.params;

	if (scrapers[company]) {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await scrapers[company](page);
		await browser.close();

		return await Job.findAll({
			include: [{ model: Company, where: { slug: company } }],
		});
	} else {
		throw Error(`No scraper available for ${company}`);
	}
});

app.listen(3000, (err, address) => {
	if (err) {
		consola.error(err);
		throw Error(err);
	}

	consola.info(`Server listening on ${address}`);
});
