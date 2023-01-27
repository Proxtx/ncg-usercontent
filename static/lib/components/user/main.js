export class Component {
  constructor(config) {
    this.document = config.shadowDom;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "order":
        this.document
          .getElementById("wrap")
          .appendChild(this.document.getElementById("img"));
        break;
    }
  }
}
