import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";

const api = await genCombine(config.api, "public/api.js", genModule);

export const execute = async function () {
  return await api.execute(...arguments);
};

export const getApps = async function () {
  return await api.getApps(...arguments);
};

export const getDefinitions = async function () {
  return await api.getDefinitions(...arguments);
};
