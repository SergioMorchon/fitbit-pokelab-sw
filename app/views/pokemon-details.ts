import { loadUI, byId, handleBack } from '../ui';
import viewHeader from '../components/view-header';
import types from '../components/types';
import stats from '../components/stats';
import { PokemonStats } from '../pokemon-stats';

loadUI('pokemon-details');

type Options = {
	pkm: PokemonStats;
};

export default ({ pkm }: Options) => {
	viewHeader(byId('main-header')).text = pkm.name;
	types(byId('types'), pkm.types);
	stats(byId('stats'), pkm.baseStats);
	handleBack(() => {
		import('./pokemon-list')
			.then(m => m.default())
			.catch(e => console.error(e));
	});
};
