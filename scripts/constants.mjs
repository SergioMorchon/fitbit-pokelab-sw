import { join } from "path";

export const dataPath = join(
  process.cwd(),
  "node_modules",
  "pokelab-sw",
  "dist",
  "data"
);

export const resourcesPath = join(process.cwd(), "resources");
export const appPath = join(process.cwd(), "app");
export const scriptsPath = join(process.cwd(), "scripts");
