import { memory } from "system";

import("./views/main");

setInterval(() => {
  console.log(((memory.js.used * 100) / memory.js.total).toFixed(2));
}, 5000);
