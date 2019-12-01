import { loadUI, byId, handleBack } from '../ui';
import viewHeader from '../components/view-header';
import types from '../components/types';
import stats from '../components/stats';
import { PokemonDetailsViewState, setNavigationState } from '../local-state';
import pokemonStats from '../pokemon-stats';

loadUI('pokemon-details');

export default (state: PokemonDetailsViewState) => {
	setNavigationState({
		view: 'pokemon-details',
		state,
	});
	const pkm = pokemonStats(state.pokedexType).get(state.pokemonIndex);
	viewHeader(byId('main-header')).text = pkm.name;
	types(byId('types'), pkm.types);
	stats(byId('stats'), pkm.baseStats);
	handleBack(() => {
		import('./pokemon-list')
			.then(m =>
				m.default({
					startIndex: state.pokemonIndex,
					pokedexType: state.pokedexType,
				}),
			)
			.catch(e => console.error(e));
	});
};
