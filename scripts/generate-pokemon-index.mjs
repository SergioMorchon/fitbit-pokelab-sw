import { dataPath } from './constants.mjs';
import pokemonStats from 'pokelab-sw/dist/pokemon-stats.js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { resourcesPath } from './constants.mjs';

const names = readFileSync(
	join(dataPath, 'pokemon-names-en.txt'),
	'utf-8',
).split('\n');

const stats = pokemonStats(
	readFileSync(join(dataPath, 'pokemon-stats')).buffer,
	{
		getName: index => names[index],
	},
);

const pokemonToSkip = new Set([
	'Pikachu 1',
	'Pikachu 2',
	'Pikachu 3',
	'Pikachu 4',
	'Pikachu 5',
	'Pikachu 6',
	'Pikachu 7',
	'Rotom 1',
	'Rotom 2',
	'Rotom 3',
	'Rotom 4',
	'Rotom 5',
	'Silvally 1',
	'Silvally 2',
	'Silvally 3',
	'Silvally 4',
	'Silvally 5',
	'Silvally 6',
	'Silvally 7',
	'Silvally 8',
	'Silvally 9',
	'Silvally 10',
	'Silvally 11',
	'Silvally 12',
	'Silvally 13',
	'Silvally 14',
	'Silvally 15',
	'Silvally 16',
	'Silvally 17',
	'Alcremie 1',
	'Alcremie 2',
	'Alcremie 3',
	'Alcremie 4',
	'Alcremie 5',
	'Alcremie 6',
	'Alcremie 7',
	'Alcremie 8',
]);

const galarIndex = new Map();
for (let i = 0; i < stats.length; i++) {
	const { galarId, name } = stats.get(i);
	if (galarId !== null && !pokemonToSkip.has(name)) {
		galarIndex.set(i, galarId);
	}
}

const galarIndexArray = Array.from(galarIndex.entries())
	.sort(([, n1], [, n2]) => n1 - n2)
	.reduce((data, [value], index) => {
		data.setUint16(index * 2, value, true);
		return data;
	}, new DataView(new ArrayBuffer(galarIndex.size * 2)));

export default () => {
	writeFileSync(
		join(resourcesPath, 'data', 'pokemon-stats-galar-index'),
		new DataView(galarIndexArray.buffer),
	);
};
