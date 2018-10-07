import consola from 'consola';
import { write, readDir, openFile, DATA_DIR } from '../utils';

export async function generateAll() {
	try {
		consola.start(`Generating global jobs file\n`);

		const files = await readDir(DATA_DIR);

		const all = {
			companies: [],
			updated: Date.now(),
		};

		for (let file of files) {
			if (file.startsWith('all')) continue;

			const content = await openFile(`${DATA_DIR}/${file}`);

			const { jobs } = JSON.parse(content.toString());
			const name = file.split('.')[0];
			const count = jobs.length;

			all.companies.push({
				name,
				jobs,
				count,
			});

			consola.info(`${count} jobs from ${name} added`);
		}

		console.log('');
		consola.info(`All files processed\n`);

		await write(`${DATA_DIR}/all.json`, JSON.stringify(all, null, 4));

		consola.success(`All jobs saved to ${DATA_DIR}/all.json\n`);

		return true;
	} catch (e) {
		consola.error(e);
	}
}
