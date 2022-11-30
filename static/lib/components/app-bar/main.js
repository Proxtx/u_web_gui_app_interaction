export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.document.getElementById("hamburger").addEventListener("click", () => {
      window.openDrawer();
    });

    this.document.getElementById("appIcon").addEventListener("click", () => {
      window.location.href = window.location.href
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
