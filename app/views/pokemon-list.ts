import pokemonStats, { PokemonStats } from '../pokemon-stats';
import { loadUI, byId } from '../ui';
import types from '../components/types';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { encode, decode } from 'cbor';

type Options = {
	startIndex: number;
};

const stateFileName = 'pokemon-list-state';
const saveState = (state: Options) => {
	writeFileSync(stateFileName, encode(state));
};
const loadState = (): Options | void => {
	if (!existsSync(stateFileName)) {
		return;
	}

	return decode(readFileSync(stateFileName));
};
const state = loadState() || {
	startIndex: 0,
};
const stats = pokemonStats();

loadUI('pokemon-list');

const VTList = byId('list') as VirtualTileList<{
	type: 'pokemon-list';
	pkm: PokemonStats;
	index: number;
}>;

VTList.delegate = {
	getTileInfo: index => ({
		type: 'pokemon-list',
		pkm: stats.get(index),
		index: index,
	}),
	configureTile: (tile, { type, pkm, index }) => {
		if (type !== 'pokemon-list') {
			return;
		}

		byId('number', tile).text = `#${pkm.galarId}`;
		byId('name', tile).text = pkm.name;
		types(byId('types', tile), pkm.types);
		byId('touch', tile).onclick = () => {
			saveState({
				startIndex: index,
			});
			import('./pokemon-details').then(m => {
				m.default({
					pkm,
				});
			});
		};
	},
};

VTList.length = stats.length;

(byId('select-number-button') as ComboButton).onactivate = () => {
	import('./selector')
		.then(m => {
			const numberOfOptions = 10;
			const options: import('./selector').Option[] = [];
			for (let i = 0; i < numberOfOptions; i++) {
				let value = 0;
				if (i === numberOfOptions - 1) {
					value = stats.length - 1;
				} else if (i > 0) {
					value = Math.floor((i * stats.length) / numberOfOptions);
				}
				options.push({
					value,
					text: String(stats.get(value).galarId),
				});
			}
			m.default(options);
		})
		.catch(e => console.error(e));
};

export default (startIndex: number = state.startIndex) => {
	VTList.value = startIndex;
};
