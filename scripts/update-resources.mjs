import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dataPath } from './constants.mjs';
import { resourcesPath } from './constants.mjs';
import generateI18n from './generate-i18n.mjs';
import generatePokemonIndex from './generate-pokemon-index.mjs';
import { join } from 'path';

const resourcesDataPath = join(resourcesPath, 'data');
if (!existsSync(resourcesDataPath)) {
	mkdirSync(resourcesDataPath);
}

copyFileSync(
	join(dataPath, 'pokemon-stats'),
	join(resourcesDataPath, 'pokemon-stats'),
);

generateI18n();

generatePokemonIndex();
