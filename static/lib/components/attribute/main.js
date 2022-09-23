const typeToComponent = {
  color: "i-color",
};

export class Component {
  constructor(options) {
    this.document = options.shadowDom;
  }

  async inputDefinition(definition) {
    let input = this.document.createElement(typeToComponent[definition.type]);
    await uiBuilder.ready(input);
    input.component.setConfig(definition);
    //this.document
  }
}
