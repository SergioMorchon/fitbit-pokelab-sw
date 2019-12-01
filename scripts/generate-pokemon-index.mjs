import { dataPath } from './constants.mjs';
import pokemonStats from 'pokelab-sw/dist/pokemon-stats.js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { resourcesPath } from './constants.mjs';

const stats = pokemonStats(
	readFileSync(join(dataPath, 'pokemon-stats')).buffer,
);

const galarIndex = new Map();
for (let i = 0; i < stats.length; i++) {
	const { galarId } = stats.get(i);
	if (galarId !== null) {
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
