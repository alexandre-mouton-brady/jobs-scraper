import puppeteer from 'puppeteer';
import consola from 'consola';
import fastify from 'fastify';
import cors from 'fastify-cors';
import { DATA_DIR, exists, mkdir, openFile } from './utils';
import scrapers from './scrapers';
import { generateAll } from './scrapers/generator';

const app = fastify();

app.register(cors, { origin: 'http://localhost:1234' });

app.get('/api/jobs', async (req, rep) => {
	try {
		if (!exists(DATA_DIR)) return { success: false };
		if (!exists(`${DATA_DIR}/all.json`)) return { success: false };

		const data = await openFile(`${DATA_DIR}/all.json`);
		return JSON.parse(data.toString());
	} catch (e) {
		consola.error(e);
		return { success: false };
	}
});

app.get('/api/sync', async (req, rep) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		if (!exists(DATA_DIR)) await mkdir(DATA_DIR);

		for (let company of Object.keys(scrapers)) {
			await scrapers[company](page);
		}

		console.log('-------\n');

		await browser.close();

		await generateAll();

		return { success: true };
	} catch (e) {
		consola.error(e);
		return { success: false };
	}
});

app.get('/api/sync/:company', async (req, rep) => {
	try {
		const { company } = req.params;
		if (scrapers[company]) {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();

			if (!exists(DATA_DIR)) await mkdir(DATA_DIR);

			await scrapers[company](page);

			await browser.close();

			await generateAll();

			return { success: true };
		} else {
			return { success: false };
		}
	} catch (e) {
		consola.error(e);
		return { success: false };
	}
});

app.get('/api/generate', async (req, rep) => {
	try {
		if (!exists(DATA_DIR)) return { success: false };

		await generateAll();

		return { success: true };
	} catch (e) {
		consola.error(e);
		return { success: false };
	}
});

app.listen(3000, (err, address) => {
	if (err) {
		consola.error(err);
		throw err;
	}

	consola.info(`Server listening on ${address}`);
});
