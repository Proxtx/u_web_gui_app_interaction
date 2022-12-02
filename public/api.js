import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";
import { auth } from "./meta.js";

const api = await genCombine(config.api, "public/api.js", genModule);
const logs = [];

export const execute = async function () {
  logs.push({ appName: arguments[1], method: arguments[2], time: Date.now() });
  if (logs.length > 20) logs.shift();
  return await api.execute(...arguments);
};

export const getApps = async function () {
  return await api.getApps(...arguments);
};

export const getDefinitions = async function () {
  return await api.getDefinitions(...arguments);
};

export const getLogs = async function (pwd) {
  if (!(await auth(pwd))) return;
  return logs;
};
