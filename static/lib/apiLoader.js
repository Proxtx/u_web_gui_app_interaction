export const api = await framework.load("api.js");
export const meta = await framework.load("meta.js");
export const flow = await framework.load("flow.js");

cookie.default =
  "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";

window.api = api;
window.meta = meta;

window.getDefinition = async (appName) => {
  if (!window.definitions) window.definitions = [];
  if (!window.definitions?.[appName]) {
    window.definitions[appName] = api.getDefinitions(cookie.pwd, appName);
  }
  return await window.definitions[appName];
};
