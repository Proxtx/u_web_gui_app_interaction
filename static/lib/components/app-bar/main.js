export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.document.getElementById("hamburger").addEventListener("click", () => {
      window.openDrawer();
    });

    this.document.getElementById("appIcon").addEventListener("click", async () => {
      this.document.getElementById("appIcon").style.transform = "rotate(360deg)";
      await new Promise (r=>setTimeout(r, 600));
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
