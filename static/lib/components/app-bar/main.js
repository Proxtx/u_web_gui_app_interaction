export class Component {
  constructor(options) {
    this.document = options.shadowDom;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "title":
        this.document.getElementById("title").innerText = newValue;
        break;
    }
  }
}
