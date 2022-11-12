import * as _ from "../lib/guiLoader.js";

const flowAction = document.getElementById("flowAction");
flowAction.component.init();

export const getAction = async () => {
  return await flowAction.component.exportAction();
};

export const size = async () => {
  flowAction.getBoundingClientRect();
};

export const resizeObserver = async () => {
  await new Promise((r) => new ResizeObserver(r).observe(flowAction));
};
