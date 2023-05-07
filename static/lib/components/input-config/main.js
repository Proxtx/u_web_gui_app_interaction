export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.argumentsWrap = this.document.getElementById("argumentsWrap");
    this.generate = this.document.getElementById("generate");
  }

  async loadConfig(config) {
    this.argumentsWrap.innerHTML = "";
    let keys = Object.keys(config);
    this.config = config;
    for (let key of keys) {
      let elem = document.createElement("u-argument");
      this.argumentsWrap.appendChild(elem, this.generate);
      await uiBuilder.ready(elem);
      let cfg = config[key];
      if (!cfg.name) cfg.name = key;
      elem.component.inputDefinition(config[key]);
      elem.component.disableInputChange();
    }
  }

  async getConfig() {
    let config = {};
    for (let key in Object.keys(this.config)) {
      config[Object.keys(this.config)[key]] = await this.argumentsWrap.children[
        key
      ].component.getValue();
    }

    return config;
  }
}
