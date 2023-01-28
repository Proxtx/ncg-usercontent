import { userInfo } from "/lib/apiLoader.js";

export class Component {
  constructor(config) {
    this.document = config.shadowDom;
    this.picture = this.document.getElementById("picture");
    this.name = this.document.getElementById("name");
    this.infoPhrases = this.document.getElementById("infoPhrases");
  }

  async loadInfo(username) {
    let info = await userInfo.getInfo(
      cookie.username,
      cookie.password,
      username
    );
    this.name.innerText = info.user.firstName + " " + info.user.name;
    this.infoPhrases.innerText = Object.keys(info.info.info)
      .map((value) => value + ": " + info.info.info[value] + "\n")
      .join();
    if (info.info.picture) {
      this.picture.src = "data:image/png;base64, " + info.info.picture;
    }
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "username":
        this.loadInfo(newValue);
        break;
    }
  }
}
