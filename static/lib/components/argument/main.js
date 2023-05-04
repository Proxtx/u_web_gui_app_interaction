const typeToComponent = {
  color: "i-color",
  number: "i-number",
  text: "i-text",
  value: "i-value",
  select: "i-select",
};

export class Component {
  constructor(options) {
    this.document = options.shadowDom;

    this.edit = this.document.getElementById("edit");

    this.edit.addEventListener("click", () => {
      this.edit.style.width = "100%";
    });
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
