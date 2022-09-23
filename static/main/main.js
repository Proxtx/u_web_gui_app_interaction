import { api } from "../lib/apiLoader.js";

if (!cookie.pwd) cookie.pwd = prompt("Pwd");

const wrap = document.getElementById("wrap");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
  closeDrawer();
});

const loadApp = async (appIndex) => {
  wrap.innerHTML = "";
  let definition = await api.getDefinitions(cookie.pwd, appIndex);
  for (let method in definition.methods) {
    let methodElem = document.createElement("u-app-method");
    wrap.appendChild(methodElem);
    await uiBuilder.ready(methodElem);
    methodElem.setAttribute("appIndex", appIndex);
    methodElem.setAttribute("method", method);
  }
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
    let button = document.createElement("m-button");
    button.className = "drawerOption";
    button.setAttribute("stretch", true);
    button.setAttribute("type", "text");
    button.innerText = apps[appIndex].name;
    drawer.appendChild(button);
    button.addEventListener("click", async () => {
      loadApp(appIndex);
      await new Promise((r) => setTimeout(r, 100));
      closeDrawer();
    });
  }
};

window.openDrawer = openDrawer;

loadApp(0);
fillDrawer();
