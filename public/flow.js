import {
  runFlow as runFlowImport,
  getFlows,
  runningFlows,
  saveFlows,
} from "../private/flow.js";
import { auth } from "./meta.js";

export const runFlow = async (pwd, name) => {
  if (!(await auth(pwd))) return;
  let id = Math.floor(Math.random() * 10000);
  runFlowImport(pwd, getFlows()[name], id);
  return id;
};

export const runFlowSync = async (pwd, name) => {
  if (!(await auth(pwd))) return;
  let id = Math.floor(Math.random() * 10000);
  await runFlowImport(pwd, getFlows()[name], id);
  return id;
};

export const setFlow = async (pwd, name, flow) => {
  if (!(await auth(pwd))) return;
  let flows = getFlows();
  flows[name] = flow;
  await saveFlows();
};

export const getFlow = async (pwd, name) => {
  if (!(await auth(pwd))) return;
  return getFlows()[name];
};

export const deleteFlow = async (pwd, name) => {
  if (!(await auth(pwd))) return;
  let flows = getFlows();
  delete flows[name];
  await saveFlows();
};

export const listFlows = async (pwd) => {
  if (!(await auth(pwd))) return;
  return Object.keys(getFlows());
};

export const flowStatus = async (pwd, id) => {
  if (!(await auth(pwd))) return;
  return runningFlows[id];
};
