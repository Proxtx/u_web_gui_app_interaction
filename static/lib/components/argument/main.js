export class Component {
  constructor(options) {
    this.document = options.shadowDom;

    this.edit = this.document.getElementById("edit");
    this.inputSelect = this.document.getElementById("inputSelect");
    this.backArrow = this.document.getElementById("backArrow");
    this.inputConfig = this.document.getElementById("inputConfig");
    this.generate = this.document.getElementById("generate");

    window.input.getInputs(cookie.pwd).then((r) => {
      this.applyOptionArray(this.inputSelect, r);
      if (this.definition) this.inputSelect.value = this.definition.type;
    });

    this.edit.addEventListener("click", (e) => {
      if (e.composedPath().includes(this.backArrow)) return;
      this.openInputSelectOverlay();
    });

    this.backArrow.addEventListener("click", () => {
      this.closeInputSelectOverlay();
    });

    this.inputSelect.addEventListener("change", () => {
      this.closeInputSelectOverlay();
      this.disableInputChange();
      this.updateInputType(this.inputSelect.value);
    });

    this.generate.addEventListener("click", () => {
      this.generateInput();
      this.inputConfig.style.display = "none";
      this.generate.style.display = "none";
      this.enableInputChange();
    });
  }

  disableInputChange() {
    this.edit.style.display = "none";
  }

  enableInputChange() {
    this.edit.style.display = "block";
  }

  openInputSelectOverlay() {
    this.edit.style.width = "100%";
    this.inputSelect.style.display = "block";
    this.backArrow.style.display = "block";
  }

  closeInputSelectOverlay() {
    this.inputSelect.style.display = "none";
    this.backArrow.style.display = "none";
    this.edit.style.width = "calc(var(--contentSpacing) * 2)";
  }

  async updateInputType(type) {
    this.input.parentElement.removeChild(this.input);
    this.inputConfig.style.display = "block";
    await uiBuilder.ready(this.inputConfig);
    let config = await window.input.getInputConfig(cookie.pwd, type);
    this.inputConfig.component.loadConfig(config);
    this.generate.style.display = "block";
    if (Object.keys(config).length == 0) this.generate.click();
  }

  async generateInput() {
    let config = await this.inputConfig.component.getConfig();
    config.name = this.definition.name;
    config.type = this.inputSelect.value;
    this.inputDefinition(config);
    this.overwriteInputConfig = config;
  }

  async inputDefinition(definition) {
    if (!customElements.get("u-input-" + definition.type)) {
      let inputData = await window.input.getInput(cookie.pwd, definition.type);
      try {
        await window.uiBuilder.loadComponent({
          template: encodeURIComponent(inputData.html),
          styles: [
            encodeURIComponent(await (await fetch("/lib/main.css")).text()),
            encodeURIComponent(inputData.css),
          ],
          component: encodeURIComponent(inputData.component),
          urlPrefix: "data:text/plain,",
          importPrefix: "data:text/javascript,",
          name: "u-input-" + definition.type,
        });
      } catch (e) {
        console.log(
          "Failed registering input. Probably because it was already registered in a different argument, while this process was running."
        );
      }
    }

    this.inputSelect.value = definition.type;
    let input = document.createElement("u-input-" + definition.type);
    this.input = input;
    this.definition = definition;
    this.document.getElementById("wrap").appendChild(input);
    this.document.getElementById("name").innerText = definition.name;
    await uiBuilder.ready(input);
    input.component.setConfig(definition);
  }

  async setValue(value) {
    if (value.inputOverwrite) {
      this.input.parentElement.removeChild(this.input);
      await this.inputDefinition(value.input);
      this.overwriteInputConfig = value.input;
      value = value.value;
    }
    await this.input.component.setValue(value);
  }

  async getValue() {
    if (this.overwriteInputConfig)
      return {
        inputOverwrite: true,
        value: await this.input.component.getValue(),
        input: this.overwriteInputConfig,
        type: this.definition.type,
      };
    return await this.input.component.getValue();
  }

  applyOptionArray = async (elem, options) => {
    elem.innerHTML = "";
    for (let option of options) {
      let oElem = document.createElement("option");
      oElem.innerText = option;
      oElem.value = option;
      elem.appendChild(oElem);
    }
  };
}
