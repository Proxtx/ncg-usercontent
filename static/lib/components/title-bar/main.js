export class Component {
  constructor(config) {
    this.document = config.shadowDom;
    this.document.getElementById("user").innerText = cookie.username;
  }
}
