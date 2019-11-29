import pokemonStats, { PokemonStats } from "../pokemon-stats";
import document from "document";
import handleBack from "./handle-back";
import { loadUI } from "../ui";
import { getTypeName } from "../types";

loadUI("pokemon-list");

const VTList = document.getElementById("my-list") as VirtualTileList<{
  type: "pokemon-list";
  pkm: PokemonStats;
}>;

VTList.delegate = {
  getTileInfo: index => ({
    type: "pokemon-list",
    pkm: pokemonStats.get(index)
  }),
  configureTile: (tile, { type, pkm }) => {
    if (type !== "pokemon-list") {
      return;
    }

    tile.getElementById("national-id").text = `#${pkm.nationalId}`;
    tile.getElementById("name").text = pkm.name;
    const types = pkm.types;
    tile.getElementById("type-1").text = getTypeName(types[0]);
    const type2Element = tile.getElementById("type-2") as TextElement;
    if (types.length > 1) {
      type2Element.style.visibility = "visible";
      type2Element.text = getTypeName(types[1]);
    } else {
      type2Element.style.visibility = "hidden";
    }
  }
};

VTList.length = pokemonStats.length;

handleBack(() => {
  import("./main");
});
