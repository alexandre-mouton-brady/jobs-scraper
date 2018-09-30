import puppeteer from 'puppeteer';
import { DATA_DIR, exists, mkdir } from './utils';
import { iZettle, tobii, tocaboca, king, spotify } from './scrapers';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	if (!exists(DATA_DIR)) await mkdir(DATA_DIR);

	await iZettle(page);
	await tocaboca(page);
	await tobii(page);
	await king(page);
	await spotify(page);

	await browser.close();
})();
