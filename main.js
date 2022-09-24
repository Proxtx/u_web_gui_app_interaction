import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import { setConfig } from "@proxtx/framework/static.js";

setConfig({
  ignoreParseHtml: ["/lib/components", "/lib/input_methods"],
  customScriptFileExtensions: [".html", ".route"],
});
await listen(config.port);
console.log("Server running. Port:", config.port);
