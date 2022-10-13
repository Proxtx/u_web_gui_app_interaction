export class Component {
  expanded = false;

  loadingMethods = false;
  loadingArguments = false;

  constructor(options) {
    this.document = options.shadowDom;

    this.appSelect = this.document.getElementById("appSelect");
    this.methodSelect = this.document.getElementById("methodSelect");
    this.arguments = this.document.getElementById("arguments");
    this.title = this.document.getElementById("title");
    this.arrow = this.document.getElementById("arrow");
    this.content = this.document.getElementById("content");
    this.box = this.document.getElementById("box");

    this.arrow.addEventListener("click", () => {
      if (this.box.classList.contains("expanded")) this.hide();
      else this.show();
    });

    this.appSelect.addEventListener("change", async () => {
      await this.loadMethods();
      await this.loadArguments();
    });

    this.methodSelect.addEventListener("change", () => {
      this.loadArguments();
    });
  }

  init = async () => {
    await this.loadApps();
    this.appSelect.selectedIndex = -1;
  };

  hide = () => {
    this.expanded = false;
    this.content.style.display = "none";
    this.arrow.classList.remove("arrowRotated");
    this.box.classList.remove("expanded");
    this.changeCallback && this.changeCallback();
  };

  show = () => {
    this.expanded = true;
    this.content.style.display = "flex";
    this.arrow.classList.add("arrowRotated");
    this.box.classList.add("expanded");
    this.changeCallback && this.changeCallback();
  };

  async loadApps() {
    let apps = await window.api.getApps(cookie.pwd);
    let appNames = Object.keys(apps);
    this.applyOptionArray(this.appSelect, appNames);
  }

  async loadMethods() {
    if (this.loadingMethods) return;
    this.loadingMethods = true;

    let appDefinition = await window.getDefinition(this.appSelect.value);

    let methodNames = Object.values(appDefinition.methods).map((v) => v.name);
    this.applyOptionArray(this.methodSelect, methodNames);

    this.loadingMethods = false;
  }

  async loadArguments() {
    if (this.loadingArguments) return;
    this.loadingArguments = true;

    this.arguments.innerHTML = "";

    let appDefinition = await window.getDefinition(this.appSelect.value);

    let methodDefinition;
    for (let method in appDefinition.methods) {
      if (appDefinition.methods[method].name == this.methodSelect.value) {
        methodDefinition = appDefinition.methods[method];
        break;
      }
    }

    for (let argument of methodDefinition.arguments) {
      let elem = document.createElement("u-argument");
      await uiBuilder.ready(elem);
      await elem.component.inputDefinition(argument);
      this.arguments.appendChild(elem);
    }

    this.updateTitle();

    this.loadingArguments = false;
  }

  setArgumentValues = (values) => {
    for (let valueIndex in values) {
      this.arguments.children[valueIndex].component.input.component.setValue(
        values[valueIndex]
      );
    }
  };

  getArgumentValues = () => {
    let values = [];

    for (let elem of this.arguments.children) {
      values.push(elem.component.input.component.getValue());
    }

    return values;
  };

  importAction = async (actionDefinition) => {
    await this.loadApps();
    this.appSelect.value = actionDefinition.appName;
    await this.loadMethods();
    this.methodSelect.value = (
      await window.getDefinition(this.appSelect.value)
    ).methods[actionDefinition.method].name;
    await this.loadArguments();
    this.setArgumentValues(actionDefinition.arguments);
  };

  exportAction = async () => {
    let method;
    let appDefinition = await window.getDefinition(this.appSelect.value);
    for (let methodName in appDefinition.methods) {
      if (appDefinition.methods[methodName].name == this.methodSelect.value) {
        method = methodName;
        break;
      }
    }

    return {
      appName: this.appSelect.value,
      method,
      arguments: this.getArgumentValues(),
    };
  };

  applyOptionArray = async (elem, options) => {
    elem.innerHTML = "";
    for (let option of options) {
      let oElem = document.createElement("option");
      oElem.innerText = option;
      oElem.value = option;
      elem.appendChild(oElem);
    }
  };

  updateTitle = () => {
    this.title.innerText =
      this.appSelect.value + " - " + this.methodSelect.value;
  };
}
