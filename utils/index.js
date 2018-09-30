import { promisify } from 'util';
import { writeFile, existsSync, mkdir as md, readdir, readFile } from 'fs';
import { resolve } from 'url';

/**
 * Create a JSON file with the name in parameters to the data directory
 *
 * @param {string} name - Name of the file
 */
export const file = name => `${DATA_DIR}/${name}.json`;

export const DATA_DIR = resolve(__dirname, 'data');

export const write = promisify(writeFile);

export const exists = existsSync;

export const mkdir = promisify(md);

export const readDir = promisify(readdir);

export const openFile = promisify(readFile);

export const log = v => console.log(v);
