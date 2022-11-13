import * as _ from "../lib/guiLoader.js";

const flowAction = document.getElementById("flowAction");
flowAction.component.init();
flowAction.component.box.style.margin = "0";

export const getAction = async () => {
  return await flowAction.component.exportAction();
};

export const size = async () => {
  return flowAction.getBoundingClientRect();
};

export const importAction = async (action) => {
  await flowAction.component.importAction(action);
};

let resolve;

export const resizeObserver = async () => {
  await new Promise((r) => {
    resolve = r;
  });
};

new ResizeObserver(() => {
  resolve && resolve();
}).observe(flowAction.component.box);
