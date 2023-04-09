import { userInfo } from "/lib/apiLoader.js";

export class Component {
  constructor(config) {
    this.document = config.shadowDom;
    this.picture = this.document.getElementById("picture");
    this.name = this.document.getElementById("name");
    this.infoPhrases = this.document.getElementById("infoPhrases");
    this.editButton = this.document.getElementById("editButton");
  }

  async loadInfo(username) {
    let info = await userInfo.getInfo(
      decodeURI(cookie.username),
      cookie.password,
      username
    );
    let allPhrases = await userInfo.getInfoPhrases(
      decodeURI(cookie.username),
      cookie.password
    );

    this.name.innerText = info.user.firstName + " " + info.user.name;
    this.infoPhrases.innerText = allPhrases
      .map((value) => {
        if (info.info.info[value])
          return value + ": " + info.info.info[value] + "\n";
        return undefined;
      })
      .filter((value) => {
        return value !== undefined && value.trim() != "";
      })
      .join("");
    if (info.info.picture) {
      this.picture.src = "/file.route/?id=" + info.info.picture;
    } else this.picture.src = "/lib/img/user.svg";

    if (username == decodeURI(cookie.username) && false) {
      this.editButton.style.display = "unset";
      this.editButton.addEventListener("click", async () => {
        await new Promise((r) => setTimeout(r, 200));
        location.pathname = "/edit";
      });
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
