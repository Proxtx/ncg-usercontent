import { userInfo, content } from "/lib/apiLoader.js";

export class Component {
  constructor(config) {
    this.document = config.shadowDom;
    this.img = this.document.getElementById("img");
    this.user = this.document.getElementById("user");
    this.text = this.document.getElementById("text");
    this.deleteButton = this.document.getElementById("deleteButton");
    this.favoriteButton = this.document.getElementById("favorite");
  }

  async display(data, index, requestedUser) {
    let info = await userInfo.userData(
      decodeURI(cookie.username),
      cookie.password,
      data.username
    );
    this.user.innerText = info.firstName + " " + info.name;
    if (data.content.type == "image") {
      this.text.style.display = "none";
      this.img.src = "/file.route/?id=" + data.content.content;
    } else {
      this.img.style.display = "none";
      this.text.innerText = data.content.content;
    }

    if (decodeURI(cookie.username) != requestedUser)
      this.deleteButton.style.display = "none";

    if (data.favorite) this.favoriteButton.setAttribute("type", "contained");

    if (requestedUser == decodeURI(cookie.username)) {
      this.deleteButton.addEventListener("click", async () => {
        await new Promise((r) => setTimeout(r, 200));
        await content.deleteContent(
          decodeURI(cookie.username),
          cookie.password,
          index
        );
        location.href = location.href;
      });

      this.favoriteButton.addEventListener("click", async () => {
        if (data.favorite) data.favorite = false;
        else data.favorite = true;

        await content.favoriteContent(
          decodeURI(cookie.username),
          cookie.password,
          index,
          data.favorite
        );

        if (data.favorite) {
          this.favoriteButton.setAttribute("type", "contained");
        } else this.favoriteButton.setAttribute("type", "outlined");
      });
    }
  }
}
