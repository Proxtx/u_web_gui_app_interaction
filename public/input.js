import config from "@proxtx/config";
import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";

let api = await genCombine(config.inputs, "public/api.js", genModule);

export const getInput = async function () {
  return await api.getInput(...arguments);
};

export const getInputs = async function () {
  return await api.getInputs(...arguments);
};

export const getInputConfig = async function () {
  return await api.getInputConfig(...arguments);
};

export const evaluateInput = async function () {
  return await api.evaluateInput(...arguments);
};

export const resolveArgument = async function () {
  return await api.resolveInput(...arguments);
};
