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
      case "appindex":
        this.appIndex = newValue;
        this.generateArguments();
        break;
      case "method":
        this.method = newValue;
        this.generateArguments();
        break;
    }
  }

  async generateArguments() {
    if (!this.appIndex || !this.method) return;
    let definitions = await this.api.getDefinitions(cookie.pwd, this.appIndex);
    let method = definitions.methods[this.method];
    this.name.innerText = method.name;

    for (let definition of method.arguments) {
      let argument = document.createElement("u-argument");
      this.wrap.appendChild(argument);
      await uiBuilder.ready(argument);
      await argument.component.inputDefinition(definition);
      this.argumentElements.push(argument);
    }
  }

  async execute() {
    let args = [];
    for (let argElem of this.argumentElements) {
      args.push(argElem.component.input.component.getValue());
    }

    this.executeButton.innerText = "...";
    let response = await this.api.execute(
      cookie.pwd,
      this.appIndex,
      this.method,
      args
    );
    this.executeButton.innerText = "Execute";
    if (response == undefined) return;
    this.response.innerText = response;
    await new Promise((r) => setTimeout(r, 5000));
    this.response.innerText = "";
  }
}
