import { loadUI, byId } from '../ui';
import { PokedexType, clearNavigationState } from '../local-state';

loadUI('main');
clearNavigationState();

const loadPokemonList = (pokedexType: PokedexType) =>
	import('./pokemon-list')
		.then(m =>
			m.default({
				pokedexType: pokedexType,
				startIndex: 0,
			}),
		)
		.catch(e => console.error(e));
byId('galar-pokedex').onclick = () => {
	loadPokemonList('galar');
};
byId('full-pokedex').onclick = () => {
	loadPokemonList('full');
};
