import { genModule } from "@proxtx/combine/combine.js";
import { genCombine } from "@proxtx/combine-rest/request.js";
import config from "@proxtx/config";

const api = await genCombine(config.flows, "public/api.js", genModule);

export const runFlow = async function () {
  return await api.runFlow(...arguments);
};

export const runFlowSync = async function () {
  return await api.runFlowSync(...arguments);
};

export const setFlow = async function () {
  return await api.setFlow(...arguments);
};

export const getFlow = async function () {
  return await api.getFlow(...arguments);
};

export const deleteFlow = async function () {
  return await api.deleteFlow(...arguments);
};

export const listFlows = async function () {
  return await api.listFlows(...arguments);
};

export const flowStatus = async function () {
  return await api.flowStatus(...arguments);
};
