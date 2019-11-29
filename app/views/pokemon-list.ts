import pokemonStats, { PokemonStats } from '../pokemon-stats';
import document from 'document';
import handleBack from './handle-back';
import { loadUI } from '../ui';
import typeComponent from '../components/type';

loadUI('pokemon-list');

const VTList = document.getElementById('my-list') as VirtualTileList<{
	type: 'pokemon-list';
	pkm: PokemonStats;
}>;

VTList.delegate = {
	getTileInfo: index => ({
		type: 'pokemon-list',
		pkm: pokemonStats.get(index),
	}),
	configureTile: (tile, { type, pkm }) => {
		if (type !== 'pokemon-list') {
			return;
		}

		tile.getElementById('national-id').text = `#${pkm.nationalId}`;
		tile.getElementById('name').text = pkm.name;
		const type1 = typeComponent(tile.getElementById('type-1'));
		const type2 = typeComponent(tile.getElementById('type-2'));
		const types = pkm.types;
		type1.type = types[0];
		if (types.length > 1) {
			type2.type = types[1];
			type2.isVisible = true;
		} else {
			type2.isVisible = false;
		}
	},
};

VTList.length = pokemonStats.length;
/*
handleBack(() => {
	import('./main');
});
*/
