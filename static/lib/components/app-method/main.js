export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.api = window.api;
    this.wrap = this.document.getElementById("attributeWrap");
    this.name = this.document.getElementById("name");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "appindex":
        this.appIndex = newValue;
        this.generateAttributes();
        break;
      case "method":
        this.method = newValue;
        this.generateAttributes();
        break;
    }
  }

  async generateAttributes() {
    if (!this.appIndex || !this.method) return;
    let definitions = await this.api.getDefinitions(cookie.pwd, this.appIndex);
    let method = definitions.methods[this.method];
    this.name.innerText = method.name;

    for (let definition of method.arguments) {
      let attribute = document.createElement("u-attribute");
      this.wrap.appendChild(attribute);
      await uiBuilder.ready(attribute);
      await attribute.component.inputDefinition(definition);
    }
  }
}
