export const api = await framework.load("api.js");
export const meta = await framework.load("meta.js");
export const flow = await framework.load("flow.js");

window.api = api;
window.meta = meta;

window.getDefinition = async (appIndex) => {
  if (!window.definitions) window.definitions = [];
  if (!window.definitions?.[appIndex]) {
    window.definitions[appIndex] = api.getDefinitions(cookie.pwd, appIndex);
  }
  return await window.definitions[appIndex];
};
