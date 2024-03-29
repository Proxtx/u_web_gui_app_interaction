import { closeDrawer } from "../lib/drawer.js";

import * as _ from "../lib/guiLoader.js";
import { flow } from "../lib/apiLoader.js";

let activeIndex = 0;
const actionWrap = document.getElementById("actionWrap");
const appBar = document.getElementById("appBar");
const runButton = document.getElementById("runButton");
const argumentEditor = document.getElementById("argumentEditor");
let currentFlow;
let currentFlowName;

const renderActions = async (actions) => {
  actionWrap.innerHTML = "";
  for (let actionIndex in actions) {
    let action = actions[actionIndex];
    let actionElem = await generateActionElem(action);
    actionWrap.appendChild(actionElem);

    actionElem.component.changeCallback = () => {
      updateCorners();
    };
  }

  updateCorners();
};

const updateCorners = () => {
  let lastComponent;
  for (let elemIndex = 0; elemIndex < actionWrap.children.length; elemIndex++) {
    let component = actionWrap.children[elemIndex].component;
    component.box.className = "box";

    if (elemIndex == 0) component.box.classList.add("top");
    if (elemIndex == actionWrap.children.length - 1)
      component.box.classList.add("bottom");
    if (component.expanded) {
      lastComponent && lastComponent.box.classList.add("bottom");
      component.box.classList.add("expanded");
    }
    if (lastComponent && lastComponent.expanded)
      component.box.classList.add("top");

    lastComponent = component;
  }

  renderActive();
};

const renderActive = () => {
  for (let elem of actionWrap.children) {
    elem.component.box.classList.remove("active");
  }

  if (actionWrap.children[activeIndex])
    actionWrap.children[activeIndex].component.box.classList.add("active");
};

const generateActionElem = async (actionConfig) => {
  const actionElem = document.createElement("u-action");
  await uiBuilder.ready(actionElem);
  await actionElem.component.importAction(actionConfig);
  actionElem.addEventListener("click", () => {
    for (let i = 0; i < actionElem.parentElement.children.length; i++) {
      if (actionElem.parentElement.children[i] == actionElem) {
        activeIndex = i;
        renderActive();
      }
    }
  });
  return actionElem;
};

const generateFlow = async () => {
  let actions = [];
  for (let action = 0; action < actionWrap.children.length; action++) {
    actions.push(await actionWrap.children[action].component.exportAction());
  }
  return { actions, arguments: await argumentEditor.component.getConfigs() };
};

window.addAction = async () => {
  let elem = document.createElement("u-action");
  await uiBuilder.ready(elem);
  await elem.component.init();
  if (activeIndex == actionWrap.children.length - 1)
    actionWrap.appendChild(elem);
  else {
    actionWrap.insertBefore(elem, actionWrap.children[activeIndex + 1]);
  }
  updateCorners();
  elem.component.changeCallback = () => {
    updateCorners();
  };

  activeIndex++;
  renderActive();

  let localIndex = activeIndex;
  elem.addEventListener("click", () => {
    activeIndex = localIndex;
    renderActive();
  });
};

window.removeAction = () => {
  actionWrap.removeChild(actionWrap.children[activeIndex]);
  if (activeIndex > actionWrap.children.length - 1) {
    activeIndex = actionWrap.children.length - 1;
  }
  renderActive();
  updateCorners();
};

window.runAction = async () => {
  runButton.innerText = "...";

  let flowConfig = await generateFlow();
  await flow.setFlow(cookie.pwd, currentFlowName, flowConfig);
  let id = await flow.runFlow(
    cookie.pwd,
    currentFlowName,
    await argumentEditor.component.getValues()
  );
  while (true) {
    let status = await flow.flowStatus(cookie.pwd, id);
    if (!status) break;
    activeIndex = status.actions.length;
    renderActive();
    await new Promise((r) => setTimeout(r, 500));
  }

  runButton.innerText = "run";
};

window.deleteAction = async () => {
  await flow.deleteFlow(cookie.pwd, currentFlowName);
  location.reload();
};

window.saveAction = async () => {
  await flow.deleteFlow(cookie.pwd, currentFlowName);
  currentFlowName = prompt("Name?", currentFlowName);
  let flowConfig = await generateFlow();
  await flow.setFlow(cookie.pwd, currentFlowName, flowConfig);
};

const fillDrawer = async () => {
  let flows = await flow.listFlows(cookie.pwd);
  for (let flow of flows) {
    let button = document.createElement("m-button");
    button.className = "drawerOption";
    button.setAttribute("stretch", true);
    button.setAttribute("type", "text");
    button.innerText = flow;
    drawer.appendChild(button);
    button.addEventListener("click", async () => {
      loadFlow(flow);
      await new Promise((r) => setTimeout(r, 100));
      closeDrawer();
    });
  }

  let newButton = document.createElement("m-button");
  newButton.className = "drawerOption";
  newButton.setAttribute("stretch", true);
  newButton.innerText = "new";
  drawer.appendChild(newButton);
  newButton.addEventListener("click", () => {
    createNewFlow(prompt("Name"));
  });

  let executeButton = document.createElement("m-button");
  executeButton.className = "drawerOption";
  executeButton.setAttribute("stretch", true);
  executeButton.setAttribute("type", "text");
  executeButton.innerText = "execute overview";
  drawer.appendChild(executeButton);
  executeButton.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 100));
    location.pathname = "../main";
  });
};

const createNewFlow = async (name) => {
  await flow.setFlow(cookie.pwd, name, { actions: [] });
  location.href = location.href;
};

const loadFlow = async (flowName) => {
  currentFlowName = flowName;
  currentFlow = await flow.getFlow(cookie.pwd, flowName);
  renderActions(currentFlow.actions);
  await argumentEditor.component.loadArguments(currentFlow.arguments);
  appBar.setAttribute("title", "Unify Flow - " + currentFlowName);
};

fillDrawer();
