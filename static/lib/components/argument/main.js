const typeToComponent = {
  color: "i-color",
  number: "i-number",
};

export class Component {
  constructor(options) {
    this.document = options.shadowDom;
  }

  async inputDefinition(definition) {
    let input = document.createElement(typeToComponent[definition.type]);
    this.input = input;
    this.document.getElementById("wrap").appendChild(input);
    this.document.getElementById("name").innerText = definition.name;
    await uiBuilder.ready(input);
    input.component.setConfig(definition);
  }
}
