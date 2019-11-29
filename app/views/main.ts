import { loadUI } from "../ui";
import document from "document";

loadUI("main");

document.getElementById("pokedex").onclick = () => {
  import("./pokemon-list");
};
