export class Component {
  constructor(config) {
    this.document = config.shadowDom;
    this.document.getElementById("user").innerText = decodeURI(cookie.username);
    this.document
      .getElementById("user")
      .setAttribute("click", decodeURI(cookie.username));
  }
}
