import { copyFileSync } from "fs";
import { dataPath } from "./constants.mjs";
import { resourcesPath } from "./constants.mjs";
import generateI18n from "./generate-i18n.mjs";
import { join } from "path";

copyFileSync(
  join(dataPath, "pokemon-stats"),
  join(resourcesPath, "pokemon-stats")
);

generateI18n();
