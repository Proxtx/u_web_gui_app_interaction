export class Component {
  constructor(options) {
    this.select = options.shadowDom.getElementById("select");
  }

  setConfig(config) {
    applyOptionArray(this.select, config.options);
  }

  getValue() {
    return this.select.value;
  }

  setValue(value) {
    this.select.value = value;
  }
}

const applyOptionArray = async (elem, options) => {
  elem.innerHTML = "";
  for (let option of options) {
    let oElem = document.createElement("option");
    oElem.innerText = option;
    oElem.value = option;
    elem.appendChild(oElem);
  }
};
