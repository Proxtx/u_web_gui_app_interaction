export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.document.getElementById("hamburger").addEventListener("click", () => {
      window.openDrawer();
    });
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "title":
        this.document.getElementById("title").innerText = newValue;
        break;
    }
  }
}
