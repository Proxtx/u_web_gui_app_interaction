import * as _ from "../lib/guiLoader.js";

const action = document.getElementById("action");
action.component.init();
action.component.box.style.margin = "0";
action.component.box.style.borderRadius = "var(--borderRadius)";
action.component.box.style.border = getComputedStyle(
  action.component.box
).borderRight;

export const getAction = async () => {
  return await action.component.exportAction();
};

export const size = async () => {
  return action.getBoundingClientRect();
};

export const importAction = async (actionConfig) => {
  await action.component.importAction(actionConfig);
};

let resolve;

export const resizeObserver = async () => {
  await new Promise((r) => {
    resolve = r;
  });
};

new ResizeObserver(() => {
  resolve && resolve();
}).observe(action.component.box);
