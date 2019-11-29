import { readFileSync, writeFileSync } from "fs";
import { appPath, dataPath } from "./constants.mjs";
import { join } from "path";

writeFileSync(
  join(appPath, "i18n", "pokemon-names-en-US.po"),
  readFileSync(join(dataPath, "pokemon-names-en.txt"), "utf-8")
    .split("\n")
    .map(
      (name, index) =>
        `msgid "pkm_${index}"
msgstr "${name}"`
    )
    .join("\n")
);
