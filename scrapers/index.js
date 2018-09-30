import { createScraper } from './scrapper';

/**
 * TODO: Create a config file instead of writing those hard coded
 */

export const iZettle = createScraper(
	'iZettle',
	'https://jobs.izettle.com/jobs?department_id=14514&location_id=17585',
	{
		links: 'ul.jobs li > a',
		title: '.job-header h1',
		location: '.job-header h2',
		description: 'div.body',
	},
);

export const king = createScraper(
	'king',
	'https://king.com/jobs?locations=stockholm&roles=all&keywords=web&searchInDescription=1',
	{
		links: 'a.OpenPositions_position_link',
		title: 'h2.TextHeader',
		location: '.googleMap_address',
		description: 'div.JobsPosting_body',
	},
);

export const spotify = createScraper(
	'spotify',
	'https://www.spotifyjobs.com/search-jobs/#search=Web+Developer&category=engineering-it&location=sweden',
	{
		links: 'a.table-item--link',
		title: '.component-content h1',
		location: '.single-post--meta',
		description: '.entry-content',
	},
);

export const tobii = createScraper(
	'tobii',
	'https://careers.tobii.com/jobs?department_id=22610&location_id=23092',
	{
		links: 'ul.jobs li > a',
		title: '.job-header h1',
		location: '.job-header h2',
		description: 'div.body',
	},
);

export const tocaboca = createScraper('tocaboca', 'https://tocaboca.com/careers/', {
	links: 'div.open-positions a',
	title: '.job-header h1',
	location: 'ul.job-attributes',
	description: 'div.description',
});
