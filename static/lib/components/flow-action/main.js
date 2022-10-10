export class Component {
  appIndex = 0;

  constructor(options) {
    this.document = options.shadowDom;

    this.appSelect = this.document.getElementById("appSelect");
    this.methodSelect = this.document.getElementById("methodSelect");
    this.arguments = this.document.getElementById("arguments");
    this.title = this.document.getElementById("title");
    this.arrow = this.document.getElementById("arrow");
    this.content = this.document.getElementById("content");
    this.box = this.document.getElementById("box");

    this.appSelect.addEventListener("change", () => {
      this.appIndex = this.appNames.indexOf(this.appSelect.value);
      this.applyMethods();
    });

    this.methodSelect.addEventListener("change", () => {
      this.methodUpdate();
    });

    this.arrow.addEventListener("click", () => {
      if (this.box.classList.contains("expanded")) this.hide();
      else this.show();
    });

    this.setup();
  }

  setup = async () => {
    let apps = await window.api.getApps(cookie.pwd);
    this.appNames = apps.map((app) => app.name);
    this.applyOptionArray(this.appSelect, this.appNames);
    this.applyMethods();
  };

  applyMethods = async () => {
    this.appDefinition = await window.getDefinition(this.appIndex);
    let methodNames = Object.values(this.appDefinition.methods).map(
      (v) => v.name
    );
    this.applyOptionArray(this.methodSelect, methodNames);
    this.methodUpdate();
  };

  showArguments = async () => {
    this.arguments.innerHTML = "";

    for (let argument of this.methodDefinition.arguments) {
      let elem = document.createElement("u-argument");
      await uiBuilder.ready(elem);
      elem.component.inputDefinition(argument);
      this.arguments.appendChild(elem);
    }
  };

  methodUpdate = async () => {
    for (let method in this.appDefinition.methods) {
      if (this.appDefinition.methods[method].name == this.methodSelect.value) {
        this.methodDefinition = this.appDefinition.methods[method];
        break;
      }
    }
    await this.showArguments();
    this.updateTitle();
  };

  updateTitle = () => {
    this.title.innerText =
      this.appSelect.value + " - " + this.methodSelect.value;
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

  hide = () => {
    this.content.style.display = "none";
    this.arrow.classList.remove("arrowRotated");
    this.box.classList.remove("expanded");
  };

  show = () => {
    this.content.style.display = "flex";
    this.arrow.classList.add("arrowRotated");
    this.box.classList.add("expanded");
  };
}
