import { file, write } from '../utils';

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
 * TODO: Handle promises fail
 * TODO: Explain the code more
 * TODO: More logs
 */
export function createScraper(name, url, selectors) {
	return async function(page) {
		const fileName = file(name);

		/** STEP 1: Navigate to page */
		await page.goto(url, { waitUntil: 'networkidle2' });

		/** STEP 2: Compute all the links */
		const jobsList = await page.evaluate(
			({ links }) => Array.from(document.querySelectorAll(links)).map(a => a.href),
			selectors,
		);

		const data = {
			jobs: [],
			updated: Date.now(),
		};

		for (let link of jobsList) {
			/** STEP 3: Open each link */
			await page.goto(link, { waitUntil: 'networkidle2' });

			const t = await page.evaluate(
				({ link, title, description, location }) => ({
					title: document.querySelector(title).innerText,
					location: document.querySelector(location).innerText,
					description: document.querySelector(description).innerText,
					link,
				}),
				selectors,
			);

			/** STEP 4: Push the job in the array of jobs */
			data.jobs.push(t);
		}

		try {
			/** STEP 5: Write the array of jobs to file */
			await write(fileName, JSON.stringify(data, null, 4));

			console.log(`${name} jobs updated on ${new Date(data.updated)}`);
		} catch (e) {
			throw e;
		}

		return true;
	};
}
