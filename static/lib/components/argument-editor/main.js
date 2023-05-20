export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.options = options;

    this.addButton = this.document.getElementById("add");
    this.removeButton = this.document.getElementById("remove");
    this.arguments = this.document.getElementById("arguments");

    this.addButton.addEventListener("click", () => {
      this.addArgument();
    });

    this.removeButton.addEventListener("click", () => {
      this.removeArgument();
    });
  }

  async loadArguments(args) {
    if (args)
      for (let arg of args) {
        await this.addArgument(arg);
      }
  }

  async addArgument(presetConfig = null) {
    let argument = document.createElement("u-argument");
    this.arguments.appendChild(argument);
    await uiBuilder.ready(argument);
    let config = presetConfig
      ? presetConfig
      : {
          type: "text",
          name: prompt("Name"),
          placeholder: "Argument " + (this.arguments.children.length - 1),
        };

    argument.component.inputDefinition(config);
    argument.component.overwriteInputConfig = config;
  }

  async removeArgument() {
    if (this.arguments.children.length > 0) {
      this.arguments.children[this.arguments.children.length - 1].remove();
    }
  }

  async getConfigs() {
    let configs = [];
    for (let argument of this.arguments.children) {
      configs.push(argument.component.overwriteInputConfig);
    }

    return configs;
  }

  async getValues() {
    let values = [];
    for (let argument of this.arguments.children) {
      values.push(await argument.component.getValue());
    }

    return values;
  }
}
