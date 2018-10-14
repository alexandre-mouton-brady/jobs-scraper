import consola from 'consola';
import { ASSETS_DIR } from '../utils';
import { Job, Company } from '../db';

/**
 * This is a factory function to create a scraper.
 *
 * Given a name, an url and a list a selector it bootstraps a function that will:
 * 1. Open the page where job listing is
 * 2. Compute all the links
 * 3. Open each link one by one and fetch the job description
 * 4. Push the job description in an array of jobs
 * 5. Save this array to a json file
 *
 * @typedef { {links: string, title: string, description: string, location: string} } Selectors
 *
 * @param {string} name - Name of the file that will be saved on the data folder
 * @param {string} url - Url where the job listing is
 * @param {Selectors} selectors - List of CSS selectors
 *
 * TODO: Explain the code more
 */
export function createScraper(name, slug, url, selectors) {
	return async function(page) {
		try {
			const logo = `${name}-logo.png`;
			const company = await Company.findOrCreate({
				where: { name },
				defaults: { url, logo, slug },
			}).spread(user => user.get({ plain: true }));

			await Job.destroy({ where: { companyId: company.id } });

			consola.start(`Scraping for ${name} jobs\n`);
			consola.info(`Opening ${url}`);

			/** STEP 1: Navigate to page */
			await page.goto(url, { waitUntil: 'networkidle2' });

			consola.info(`Getting logo`);
			const logoNode = await page.$(selectors.logo);
			const logoPath = `${ASSETS_DIR}/${logo}`;
			await logoNode.screenshot({ path: logoPath });

			consola.info('Scraping job links');
			/** STEP 2: Compute all the links */
			const jobsList = await page.evaluate(
				({ links }) =>
					Array.from(document.querySelectorAll(links)).map(
						a => a.href,
					),
				selectors,
			);

			const jobsNumber = jobsList.length;

			consola.info(`${jobsNumber} job links found\n`);

			for (let [i, link] of jobsList.entries()) {
				consola.info(`Processing file ${i + 1}/${jobsNumber}`);
				/** STEP 3: Open each link */
				await page.goto(link, { waitUntil: 'networkidle2' });

				const data = await page.evaluate(
					({ title, description, location }) => {
						const [t, l, d] = [
							document.querySelector(title),
							document.querySelector(location),
							document.querySelector(description),
						];

						return {
							title: t ? t.innerText : '',
							location: l ? l.innerText : '',
							description: d ? d.innerText : '',
						};
					},
					selectors,
				);

				/** STEP 4: Push the job in the array of jobs */
				await Job.create({
					...data,
					link,
					logo,
					companyId: company.id,
				});
			}

			consola.success(`${name} jobs finished\n`);
			console.log('-------\n');

			return true;
		} catch (e) {
			consola.error(e);
		}
	};
}
