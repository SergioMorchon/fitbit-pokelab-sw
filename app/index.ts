import pokemonStats from "pokelab-sw/dist/pokemon-stats";
import document from "document";
import { readFileSync } from "fs";
import { gettext } from "i18n";
import { memory } from "system";

const logMemory = () => {
  console.log(((memory.js.peak * 100) / memory.js.total).toFixed(2));
};
const stats = pokemonStats(readFileSync("./resources/pokemon-stats"), {
  getName: id => gettext(`pkm_${id}`),
  getDescription: () => ""
});

const VTList = document.getElementById("my-list") as VirtualTileList<any>;

VTList.delegate = {
  getTileInfo: function(index) {
    return {
      type: "my-pool",
      pkm: stats.get(index)
    };
  },
  configureTile: function(tile, { type, pkm }) {
    if (type == "my-pool") {
      tile.getElementById("text").text = `#${pkm.nationalId} ${pkm.name}`;
    }
  }
};

VTList.length = stats.length;

setInterval(logMemory, 5000);
