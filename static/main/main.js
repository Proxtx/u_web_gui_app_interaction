import { api } from "../lib/apiLoader.js";
import { closeDrawer } from "../lib/drawer.js";

const appBar = document.getElementById("appBar");
const wrap = document.getElementById("wrap");
const drawer = document.getElementById("drawer");

const loadApp = async (appIndex, name) => {
  wrap.innerHTML = "";
  let definition = await window.getDefinition(appIndex);
  for (let method in definition.methods) {
    let methodElem = document.createElement("u-app-method");
    wrap.appendChild(methodElem);
    await uiBuilder.ready(methodElem);
    methodElem.setAttribute("appIndex", appIndex);
    methodElem.setAttribute("method", method);
  }

  appBar.setAttribute("title", "Unify - " + name);
};

const fillDrawer = async () => {
  let apps = await api.getApps(cookie.pwd);
  for (let appIndex in apps) {
    let name = apps[appIndex].name;
    let button = document.createElement("m-button");
    button.className = "drawerOption";
    button.setAttribute("stretch", true);
    button.setAttribute("type", "text");
    button.innerText = name;
    drawer.appendChild(button);
    button.addEventListener("click", async () => {
      loadApp(appIndex, name);
      await new Promise((r) => setTimeout(r, 100));
      closeDrawer();
    });
  }
};

await uiBuilder.ready(appBar);

await fillDrawer();
