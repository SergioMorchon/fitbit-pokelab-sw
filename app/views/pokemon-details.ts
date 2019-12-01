import { loadUI, byId, handleBack } from '../ui';
import viewHeader from '../components/view-header';
import types from '../components/types';
import stats from '../components/stats';
import { PokemonListViewState } from '../local-state';
import { PokemonStats } from '../pokemon-stats';

loadUI('pokemon-details');

type Options = {
	previousState: PokemonListViewState;
	pkm: PokemonStats;
};

export default ({ previousState, pkm }: Options) => {
	viewHeader(byId('main-header')).text = pkm.name;
	types(byId('types'), pkm.types);
	stats(byId('stats'), pkm.baseStats);
	handleBack(() => {
		import('./pokemon-list')
			.then(m => m.default(previousState))
			.catch(e => console.error(e));
	});
};
