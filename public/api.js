import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";
import { auth } from "./meta.js";
import { runFlow } from "./flow.js";

const api = await genCombine(config.api, "public/api.js", genModule);
const logs = [];

export const execute = async function (pwd, appName, method, args, log=true) {
  args = [...args];
  if(log) logs.push({ appName, method, time: Date.now() });
  if (config.actionFlow) {
    await runFlow(pwd, config.actionFlow, [appName, method, args, Date.now()]);
  }
  if (logs.length > 20) logs.shift();
  return await api.execute(pwd, appName, method, args);
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
