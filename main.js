import puppeteer from 'puppeteer';
import consola from 'consola';
import { DATA_DIR, exists, mkdir, readDir, openFile, write } from './utils';
import { iZettle, tobii, tocaboca, king, spotify } from './scrapers';
import { generateAll } from './scrapers/generator';

(async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		if (!exists(DATA_DIR)) await mkdir(DATA_DIR);

		await iZettle(page);
		await tocaboca(page);
		await tobii(page);
		await king(page);
		await spotify(page);

		console.log('-------\n');

		await generateAll();

		await browser.close();
	} catch (e) {
		consola.error(e);
	}
})();
