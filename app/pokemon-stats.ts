import pokemonStats, { PokemonStats } from 'pokelab-sw/dist/pokemon-stats';
import dataView from 'pokelab-sw/dist/data-view';
import { readFileSync } from 'fs';
import { gettext } from 'i18n';

export { PokemonStats };

const getGalarIndex = () => {
	const buffer = readFileSync('./resources/data/pokemon-stats-galar-index');
	const data = dataView(buffer, 0);
	const length = buffer.byteLength / 2;
	return {
		get: (index: number) => data.getUint16(index * 2),
		length,
	};
};

export default (): { get: (index: number) => PokemonStats; length: number } => {
	const stats = pokemonStats(readFileSync('./resources/data/pokemon-stats'), {
		getName: id => gettext(`pkm_${id}`),
		getDescription: () => '',
	});
	const galarIndex = getGalarIndex();
	return {
		get: index => stats.get(galarIndex.get(index)),
		length: galarIndex.length,
	};
};
