export class Component {
  argumentElements = [];

  constructor(options) {
    this.document = options.shadowDom;
    this.api = window.api;
    this.wrap = this.document.getElementById("argumentWrap");
    this.name = this.document.getElementById("name");
    this.executeButton = this.document.getElementById("execute");
    this.response = this.document.getElementById("response");
    this.executeButton.addEventListener("click", () => {
      this.execute();
    });
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "appname":
        this.appName = newValue;
        this.generateArguments();
        break;
      case "method":
        this.method = newValue;
        this.generateArguments();
        break;
    }
  }

  async generateArguments() {
    if (!this.appName || !this.method) return;

    let definitions = await window.getDefinition(this.appName);

    let method = definitions.methods[this.method];
    this.name.innerText = method.name;

    if (method.autoRun) {
      this.execute(false);
      this.executeButton.style.display = "none";
      return;
    }

    for (let definition of method.arguments) {
      let argument = document.createElement("u-argument");
      this.wrap.appendChild(argument);
      await uiBuilder.ready(argument);
      await argument.component.inputDefinition(definition);
      this.argumentElements.push(argument);
    }
  }

  async execute(hide = true) {
    let args = [];
    for (let argElem of this.argumentElements) {
      args.push(argElem.component.input.component.getValue());
    }

    this.executeButton.innerText = "...";
    let response = await this.api.execute(
      cookie.pwd,
      this.appName,
      this.method,
      args
    );
    this.executeButton.innerText = "Execute";
    if (response == undefined) return;
    try {
      this.response.innerText = JSON.stringify(response, null, 2);
    } catch {
      this.response.innerText = response;
    }
    if (!hide) return;
    await new Promise((r) => setTimeout(r, 5000));
    this.response.innerText = "";
  }
}
