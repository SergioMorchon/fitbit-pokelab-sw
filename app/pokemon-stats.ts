import pokemonStats, { PokemonStats } from "pokelab-sw/dist/pokemon-stats";
import { readFileSync } from "fs";
import { gettext } from "i18n";

export { PokemonStats };

export default pokemonStats(readFileSync("./resources/pokemon-stats"), {
  getName: id => gettext(`pkm_${id}`),
  getDescription: () => ""
});
