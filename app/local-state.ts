import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'fs';
import { encode, decode } from 'cbor';

export type PokedexType = 'full' | 'galar';

interface PokedexView {
	readonly pokedexType: PokedexType;
}

export interface PokemonListViewState extends PokedexView {
	startIndex: number;
}

export type NavigationState = {
	view: 'pokemon-list';
	state: PokemonListViewState;
};

const navigationStateFileName = 'navigation-state';

export const setNavigationState = (state: NavigationState) => {
	writeFileSync(navigationStateFileName, encode(state));
};

export const getNavigationState = (): NavigationState | void => {
	if (!existsSync(navigationStateFileName)) {
		return;
	}

	return decode(readFileSync(navigationStateFileName));
};

export const clearNavigationState = () => {
	if (existsSync(navigationStateFileName)) {
		unlinkSync(navigationStateFileName);
	}
};
