import { api } from "../lib/apiLoader.js";
import { closeDrawer } from "../lib/drawer.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

const appBar = document.getElementById("appBar");
const wrap = document.getElementById("wrap");
const drawer = document.getElementById("drawer");

const loadApp = async (appName) => {
  wrap.innerHTML = "";
  appBar.setAttribute("title", "Unify - Loading");
  let definition = await window.getDefinition(appName);
  for (let method in definition.methods) {
    let methodElem = document.createElement("u-app-method");
    wrap.appendChild(methodElem);
    await uiBuilder.ready(methodElem);
    methodElem.setAttribute("appName", appName);
    methodElem.setAttribute("method", method);
  }

  appBar.setAttribute("title", "Unify - " + appName);
};

const fillDrawer = async () => {
  let apps = await api.getApps(cookie.pwd);
  for (let appName in apps) {
    let button = document.createElement("m-button");
    button.className = "drawerOption";
    button.setAttribute("stretch", true);
    button.setAttribute("type", "text");
    button.innerText = appName;
    drawer.appendChild(button);
    button.addEventListener("click", async () => {
      loadApp(appName);
      await new Promise((r) => setTimeout(r, 100));
      closeDrawer();
    });
  }

  let newButton = document.createElement("m-button");
  newButton.className = "drawerOption";
  newButton.setAttribute("stretch", true);
  newButton.innerText = "flow editor";
  drawer.appendChild(newButton);
  newButton.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 100));
    location.pathname = "../flow";
  });

  let logsButton = document.createElement("m-button");
  logsButton.className = "drawerOption";
  logsButton.setAttribute("stretch", true);
  logsButton.innerText = "logs";
  logsButton.setAttribute("type", "text");
  drawer.appendChild(logsButton);
  logsButton.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 100));
    location.pathname = "../logs";
  });
};

await uiBuilder.ready(appBar);

await fillDrawer();
