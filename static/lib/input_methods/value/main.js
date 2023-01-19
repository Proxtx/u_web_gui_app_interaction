export class Component {
  constructor(options) {
    this.document = options.shadowDom;
  }

  setConfig(config) {}

  getValue() {
    return this.value;
  }

  async setValue(value) {
    this.value = value;
  }
}
