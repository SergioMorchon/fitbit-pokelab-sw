import { loadUI, byId } from '../ui';
import handleBack from './handle-back';
import { PokemonStats } from 'pokelab-sw/dist/pokemon-stats';
import viewHeader from '../components/view-header';
import typesRow from '../components/types';

loadUI('pokemon-details');

type Options = {
	pkm: PokemonStats;
	listIndex: number;
};

export default ({ pkm, listIndex }: Options) => {
	viewHeader(byId('main-header')).text = pkm.name;
	typesRow(byId('types')).types = pkm.types;
	handleBack(() => {
		import('./pokemon-list').then(m =>
			m.default({
				listIndex,
			}),
		);
	});
};
