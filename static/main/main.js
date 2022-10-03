import { api } from "../lib/apiLoader.js";

const appBar = document.getElementById("appBar");
const wrap = document.getElementById("wrap");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
  closeDrawer();
});

const loadApp = async (appIndex, name) => {
  wrap.innerHTML = "";
  if (!window.definitions) window.definitions = [];
  if (!window.definitions?.[appIndex]) {
    window.definitions[appIndex] = api.getDefinitions(cookie.pwd, appIndex);
  }
  let definition = await window.definitions[appIndex];
  for (let method in definition.methods) {
    let methodElem = document.createElement("u-app-method");
    wrap.appendChild(methodElem);
    await uiBuilder.ready(methodElem);
    methodElem.setAttribute("appIndex", appIndex);
    methodElem.setAttribute("method", method);
  }

  appBar.setAttribute("title", "Unify - " + name);
};

const openDrawer = () => {
  drawer.style.transform = "translateX(0)";
  overlay.style.display = "unset";
};

const closeDrawer = () => {
  drawer.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
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

window.openDrawer = openDrawer;

await uiBuilder.ready(appBar);

await fillDrawer();
openDrawer();
