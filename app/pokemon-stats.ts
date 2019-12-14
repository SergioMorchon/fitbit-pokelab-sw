import pokemonStats, { PokemonStats } from 'pokelab-swsh/dist/pokemon-stats';
import { getUint16 } from 'pokelab-swsh/dist/data-view';
import { readFileSync } from 'fs';
import { getPokemonName } from './strings';

export { PokemonStats };

const stats = pokemonStats(
	new Uint8Array(readFileSync('./resources/data/pokemon-stats')),
	{
		getName: getPokemonName,
		getDescription: () => '',
	},
);

const getGalarIndex = () => {
	const data = new Uint8Array(
		readFileSync('./resources/data/pokemon-stats-galar-index'),
	);
	const length = data.length / 2;
	return {
		get: (index: number) => getUint16(data, index * 2),
		length,
	};
};

const indexes = getGalarIndex();

export default (): {
	get: (index: number) => PokemonStats;
	length: number;
} => ({
	get: index => stats.get(indexes.get(index)),
	length: indexes.length,
});
