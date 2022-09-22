import { listen } from "@proxtx/framework";
import config from "@proxtx/config";

await listen(config.port);
console.log("Server running. Port:", config.port);
