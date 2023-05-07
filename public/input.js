import config from "@proxtx/config";
import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";

let api;

const genApi = async () => {
  api = await genCombine(config.inputs, "public/api.js", genModule);
};

export const getInput = async function () {
  if (!api) await genApi();
  return await api.getInput(...arguments);
};

export const getInputs = async function () {
  if (!api) await genApi();
  return await api.getInputs(...arguments);
};

export const getInputConfig = async function () {
  if (!api) await genApi();
  return await api.getInputConfig(...arguments);
};

export const evaluateInput = async function () {
  if (!api) await genApi();
  return await api.evaluateInput(...arguments);
};

export const resolveArgument = async function (pwd, arg) {
  if (arg?.inputOverwrite) {
    if (arg.value?.evaluate) {
      return await evaluateInput(pwd, arg.type, arg.value);
    } else {
      return arg.value;
    }
  }
  return arg;
};
