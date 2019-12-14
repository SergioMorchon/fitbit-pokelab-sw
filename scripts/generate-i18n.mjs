import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { appPath, scriptsPath } from './constants.mjs';
import { join } from 'path';

const locales = Object.keys(
	JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8')).fitbit
		.i18n,
);
console.assert(locales.length, 'No locales');

const getLines = fileName => readFileSync(fileName, 'utf-8').split('\n');

const getTypes = locale =>
	getLines(join(scriptsPath, 'i18n', locale, 'types.txt')).reduce(
		(acc, type, index) => {
			acc[`type_${index}`] = type;
			return acc;
		},
		{},
	);

const getStats = locale =>
	getLines(join(scriptsPath, 'i18n', locale, 'stats.txt')).reduce(
		(acc, type, index) => {
			acc[`stat_${index}`] = type;
			return acc;
		},
		{},
	);

const getPokemonNames = locale =>
	getLines(
		join(scriptsPath, 'i18n', locale, 'pokemon-names.txt'),
		'utf-8',
	).reduce((acc, name, index) => {
		acc[`pkm_${index}`] = name;
		return acc;
	}, {});

const getTokens = locale => ({
	...getPokemonNames(locale),
	...getTypes(locale),
	...getStats(locale),
});

const escapeQuote = s => s.replace(/"/g, '\\"');

const targetPath = join(appPath, 'i18n');

if (!existsSync(targetPath)) {
	mkdirSync(targetPath);
}

const getPo = locale =>
	readFileSync(join(scriptsPath, 'i18n', locale, 'index.po'), 'utf-8');

export default () =>
	locales.forEach(locale => {
		const tokens = getTokens(locale);
		writeFileSync(
			join(targetPath, `${locale}.po`),
			[
				getPo(locale),
				...Object.entries(tokens).map(
					([id, value]) =>
						`msgid "${escapeQuote(id)}"\nmsgstr "${escapeQuote(value)}"`,
				),
			].join('\n'),
		);
	});
