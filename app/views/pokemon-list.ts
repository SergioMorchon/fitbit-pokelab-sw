import pokemonStats, { PokemonStats } from '../pokemon-stats';
import handleBack from './handle-back';
import { loadUI, byId } from '../ui';
import types from '../components/types';

loadUI('pokemon-list');

type Options = {
	listIndex: number;
};

export default (options: Options = { listIndex: 0 }) => {
	const VTList = byId('my-list') as VirtualTileList<{
		type: 'pokemon-list';
		pkm: PokemonStats;
		listIndex: number;
	}>;

	VTList.delegate = {
		getTileInfo: index => ({
			type: 'pokemon-list',
			pkm: pokemonStats.get(index),
			listIndex: index,
		}),
		configureTile: (tile, { type, pkm, listIndex }) => {
			if (type !== 'pokemon-list') {
				return;
			}

			tile.getElementById('name').text = pkm.name;
			types(tile.getElementById('types'), pkm.types);
			tile.getElementById('touch').onclick = () => {
				import('./pokemon-details').then(m => {
					m.default({ pkm, listIndex });
				});
			};
		},
	};

	VTList.length = pokemonStats.length;
	if (options.listIndex) {
		VTList.value = options.listIndex;
	}
	/*
	handleBack(() => {
		import('./main');
	});
	*/
};
