import { dataPath } from './constants.mjs';
import pokemonStats from 'pokelab-swsh/dist/pokemon-stats.js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { resourcesPath } from './constants.mjs';

const names = readFileSync(
	join(dataPath, 'pokemon-names-en.txt'),
	'utf-8',
).split('\n');

const stats = pokemonStats(
	new Uint8Array(readFileSync(join(dataPath, 'pokemon-stats')).buffer),
	{
		getName: index => names[index],
	},
);

const pokemonToSkip = new Set([
	'Pikachu 1', // egg group changes (undiscovered)
	'Pikachu 2', // egg group changes (undiscovered)
	'Pikachu 3', // egg group changes (undiscovered)
	'Pikachu 4', // egg group changes (undiscovered)
	'Pikachu 5', // egg group changes (undiscovered)
	'Pikachu 6', // egg group changes (undiscovered)
	'Pikachu 7', // egg group changes (undiscovered)
	'Shellos 1', // color changes
	'Gastrodon 1', // color changes
	'Basculin 1', // ability changes
	'Meowstic 1', // changes color
	'Rotom 1', // type changes by form
	'Rotom 2', // type changes by form
	'Rotom 3', // type changes by form
	'Rotom 4', // type changes by form
	'Rotom 5', // type changes by form
	'Silvally 1', // type changes by object
	'Silvally 2', // type changes by object
	'Silvally 3', // type changes by object
	'Silvally 4', // type changes by object
	'Silvally 5', // type changes by object
	'Silvally 6', // type changes by object
	'Silvally 7', // type changes by object
	'Silvally 8', // type changes by object
	'Silvally 9', // type changes by object
	'Silvally 10', // type changes by object
	'Silvally 11', // type changes by object
	'Silvally 12', // type changes by object
	'Silvally 13', // type changes by object
	'Silvally 14', // type changes by object
	'Silvally 15', // type changes by object
	'Silvally 16', // type changes by object
	'Silvally 17', // type changes by object
	'Mimikyu 1', // apparently no changes
	'Cramorant 1', // apparently no changes
	'Cramorant 2', // apparently no changes
	'Toxtricity 1', // ability changes
	'Sinistea 1', // apparently no changes
	'Polteageist 1', // apparently no changes
	'Morpeko 1', // apparently no changes
	'Alcremie 1', // color changes
	'Alcremie 2', // color changes
	'Alcremie 3', // color changes
	'Alcremie 4', // color changes
	'Alcremie 5', // color changes
	'Alcremie 6', // color changes
	'Alcremie 7', // color changes
	'Alcremie 8', // color changes
	'Eternatus 1', // ?
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
