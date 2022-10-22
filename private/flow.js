import fs from "fs/promises";
import { execute } from "../public/api.js";

let flows;
export let runningFlows = {};

const loadFlows = async () => {
  flows = JSON.parse(await fs.readFile("flows.json", "utf8")).flows;
};

export const getFlows = () => {
  return flows;
};

export const saveFlows = async () => {
  let currentFlows = JSON.parse(await fs.readFile("flows.json", "utf8"));
  currentFlows.flows = flows;
  await fs.writeFile("flows.json", JSON.stringify(currentFlows));
};

export const runFlow = async (pwd, flow, id) => {
  if (!flow) return;

  let flowStatus = {
    start: Date.now(),
    flow,
    actions: [],
  };
  runningFlows[id] = flowStatus;
  for (let action of flow.actions) {
    flowStatus.actions.push(
      await execute(pwd, action.appName, action.method, action.arguments)
    );
  }

  delete runningFlows[id];
};

await loadFlows();
