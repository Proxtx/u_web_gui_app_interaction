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
    this.methodDefinition = method;
    this.name.innerText = method.name;

    if (method.autoRun) {
      this.execute();
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

  async execute() {
    let args = [];
    for (let argElem of this.argumentElements) {
      args.push(argElem.component.input.component.getValue());
    }

    let vibObj = { vib: true };
    this.vibrateLoop(vibObj);

    this.executeButton.innerText = "...";
    let response = await this.api.execute(
      cookie.pwd,
      this.appName,
      this.method,
      args
    );

    vibObj.vib = false;
    this.executeButton.innerText = "Execute";
    if (response == undefined) return;
    this.response.innerHTML = "";
    if (!this.methodDefinition.returnType) {
      let a = document.createElement("a");
      try {
        a.innerText = JSON.stringify(response, null, 2);
      } catch {
        a.innerText = response;
      }

      this.response.appendChild(a);
    } else {
      switch (this.methodDefinition.returnType) {
        case "image":
          let image = document.createElement("img");
          image.src = "data:image/png;base64," + response;
          image.style.width = "100%";
          this.response.appendChild(image);
          break;
      }
    }
  }

  async vibrateLoop(vibObj) {
    let attributeIdentifier = "methodTime" + this.appName + this.method;
    let delay = localStorage[attributeIdentifier]
      ? (Number(localStorage[attributeIdentifier]) * 2) / 15
      : 300;
    let subtract = delay / 15;
    let start = Date.now();
    while (vibObj.vib) {
      navigator.vibrate && navigator.vibrate(100);
      await new Promise((r) => setTimeout(r, delay));
      delay -= delay > 20 ? subtract : 0;
    }

    let time = Date.now() - start;
    localStorage[attributeIdentifier] = time;
  }
}
