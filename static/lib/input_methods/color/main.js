export class Component {
  constructor(options) {
    this.document = options.shadowDom;

    this.document.getElementById("visInput").addEventListener("click", () => {
      this.document.getElementById("input").click();
    });

    this.document.getElementById("input").addEventListener("change", () => {
      this.document.getElementById("visInput").style.backgroundColor =
        this.document.getElementById("input").value;
    });
  }

  getValue() {
    return this.document.getElementById("input").value;
  }

  setConfig(config) {}
}