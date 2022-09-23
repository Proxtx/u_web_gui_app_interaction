import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";

const meta = await genCombine(config.api, "public/meta.js", genModule);

export const auth = async function () {
  return await meta.auth(...arguments);
};
