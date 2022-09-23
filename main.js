import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import { setConfig } from "@proxtx/framework/static.js";

setConfig({ ignoreParseHtml: ["/lib/components", "/lib/input-methods"] });
await listen(config.port);
console.log("Server running. Port:", config.port);
