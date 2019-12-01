import { loadUI, byId } from '../ui';
import handleBack from './handle-back';
import { PokemonStats } from 'pokelab-sw/dist/pokemon-stats';
import viewHeader from '../components/view-header';
import types from '../components/types';
import stats from '../components/stats';

loadUI('pokemon-details');

type Options = {
	pkm: PokemonStats;
	listIndex: number;
};

export default ({ pkm, listIndex }: Options) => {
	viewHeader(byId('main-header')).text = pkm.name;
	types(byId('types'), pkm.types);
	stats(byId('stats'), pkm.baseStats);
	handleBack(() => {
		import('./pokemon-list').then(m =>
			m.default({
				listIndex,
			}),
		);
	});
};
