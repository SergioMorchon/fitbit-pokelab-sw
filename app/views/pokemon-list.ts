import pokemonStats, { PokemonStats } from '../pokemon-stats';
import { loadUI, byId, handleBack } from '../ui';
import types from '../components/types';
import { PokemonListViewState, setNavigationState } from '../local-state';

loadUI('pokemon-list');

export default (state: PokemonListViewState) => {
	const stats = pokemonStats(state.pokedexType);
	const VTList = byId('my-list') as VirtualTileList<{
		type: 'pokemon-list';
		pkm: PokemonStats;
		index: number;
	}>;

	VTList.delegate = {
		getTileInfo: index => ({
			type: 'pokemon-list',
			pkm: stats.get(index),
			index: index,
		}),
		configureTile: (tile, { type, pkm, index }) => {
			if (type !== 'pokemon-list') {
				return;
			}

			byId('name', tile).text = pkm.name;
			types(byId('types', tile), pkm.types);
			byId('touch', tile).onclick = () => {
				setNavigationState({
					view: 'pokemon-list',
					state: {
						pokedexType: state.pokedexType,
						startIndex: index,
					},
				});
				import('./pokemon-details').then(m => {
					m.default({
						pkm,
						previousState: {
							pokedexType: state.pokedexType,
							startIndex: index,
						},
					});
				});
			};
		},
	};

	VTList.length = stats.length;
	if (state.startIndex) {
		VTList.value = state.startIndex;
	}

	handleBack(() => {
		import('./main').catch(e => console.error(e));
	});
};
