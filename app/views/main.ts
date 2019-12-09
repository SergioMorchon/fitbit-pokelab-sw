import { loadUI, byId } from '../ui';
import { clearNavigationState } from '../local-state';

loadUI('main');
clearNavigationState();

byId('galar-pokedex').onclick = () => {
	import('./pokemon-list')
		.then(m =>
			m.default({
				pokedexType: 'galar',
				startIndex: 0,
			}),
		)
		.catch(e => console.error(e));
};
