import { createScraper } from './scrapper';

/**
 * TODO: Create a config file instead of writing those hard coded
 */

const iZettle = createScraper(
	'iZettle',
	'iZettle',
	'https://jobs.izettle.com/jobs?department_id=14514&location_id=17585',
	{
		links: 'ul.jobs li > a',
		title: '.job-header h1',
		location: '.job-header h2',
		description: 'div.body',
		logo: '.logo img',
	},
);

const king = createScraper(
	'King',
	'king',
	'https://king.com/jobs?locations=stockholm&roles=all&keywords=web&searchInDescription=1',
	{
		links: 'a.OpenPositions_position_link',
		title: 'h2.TextHeader',
		location: '.googleMap_address',
		description: 'div.JobsPosting_body',
		logo: '.HeaderComponent_logo img',
	},
);

const spotify = createScraper(
	'Spotify',
	'spotify',
	'https://www.spotifyjobs.com/search-jobs/#search=Web+Developer&category=engineering-it&location=sweden',
	{
		links: 'a.table-item--link',
		title: '.component-content h1',
		location: '.single-post--meta',
		description: '.entry-content',
		logo: '.site-header--logo .img-logo',
	},
);

const tobii = createScraper(
	'Tobii',
	'tobii',
	'https://careers.tobii.com/jobs?department_id=22610&location_id=23092',
	{
		links: 'ul.jobs li > a',
		title: '.job-header h1',
		location: '.job-header h2',
		description: 'div.body',
		logo: '.logo img',
	},
);

const tocaboca = createScraper(
	'Toca Boca',
	'tocaboca',
	'https://tocaboca.com/careers/',
	{
		links: 'div.open-positions a',
		title: '.job-header h1',
		location: 'ul.job-attributes',
		description: 'div.description',
		logo: '.svg-main-logo',
	},
);

export default {
	iZettle,
	king,
	spotify,
	tobii,
	tocaboca,
};
