import { loadUI, byId } from '../ui';

loadUI('main');

byId('pokedex').onclick = () => {
	import('./pokemon-list');
};
