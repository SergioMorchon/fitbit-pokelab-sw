import { copyFileSync } from "fs";
import { dataPath } from "./constants.mjs";
import { resourcesPath } from "./constants.mjs";

copyFileSync(
  join(dataPath, "pokemon-stats"),
  join(resourcesPath, "pokemon-stats")
);
