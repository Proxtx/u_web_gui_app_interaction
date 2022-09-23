export class Component {
  constructor(options) {
    this.document = options.document;
    this.api = window.api;
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
    console.log(definitions);
  }
}
