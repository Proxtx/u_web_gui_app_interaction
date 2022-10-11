export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.input = this.document.getElementById("input");
  }

  setConfig(config) {
    this.input.setAttribute(
      "placeholder",
      config.placeholder ? config.placeholder : "Number"
    );
    this.input.setAttribute("value", config.value ? config.value : "0");
  }

  getValue() {
    return this.input.component.value;
  }

  async setValue(value) {
    await uiBuilder.ready(this.input);
    this.input.component.value = value;
  }
}
