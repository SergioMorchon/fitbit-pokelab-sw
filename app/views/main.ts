import { loadUI, byId } from '../ui';

loadUI('main');

const loadPokemonList = (indexType: 'full' | 'galar') =>
	import('./pokemon-list').then(m =>
		m.default({
			indexType,
			listIndex: 0,
		}),
	);

byId('galar-pokedex').onclick = () => {
	loadPokemonList('galar');
};
byId('full-pokedex').onclick = () => {
	loadPokemonList('full');
};
