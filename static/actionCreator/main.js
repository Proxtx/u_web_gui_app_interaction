import * as _ from "../lib/guiLoader.js";

const flowAction = document.getElementById("flowAction");
flowAction.component.init();

export const getAction = async () => {
  return await flowAction.component.exportAction();
};
