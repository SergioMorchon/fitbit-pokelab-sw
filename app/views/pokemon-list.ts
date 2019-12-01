import pokemonStats, { PokemonStats, getGalarIndex } from '../pokemon-stats';
import { loadUI, byId, handleBack } from '../ui';
import types from '../components/types';

loadUI('pokemon-list');

type Options = {
	listIndex: number;
	indexType: 'full' | 'galar';
};

export default (options: Options = { listIndex: 0, indexType: 'full' }) => {
	const customIndex = options.indexType === 'galar' ? getGalarIndex() : null;
	const getPkm = customIndex
		? (index: number) => pokemonStats.get(customIndex.get(index))
		: (index: number) => pokemonStats.get(index);
	const VTList = byId('my-list') as VirtualTileList<{
		type: 'pokemon-list';
		pkm: PokemonStats;
		listIndex: number;
	}>;

	VTList.delegate = {
		getTileInfo: index => ({
			type: 'pokemon-list',
			pkm: getPkm(index),
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
					m.default({ pkm, listIndex, indexType: options.indexType });
				});
			};
		},
	};

	VTList.length = (customIndex || pokemonStats).length;
	if (options.listIndex) {
		VTList.value = options.listIndex;
	}

	handleBack(() => {
		import('./main');
	});
};
