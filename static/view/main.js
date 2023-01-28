import * as _ from "/lib/guiLoader.js";
import { content } from "/lib/apiLoader.js";

let requestedUsername = new URL(location.href).searchParams.get("username");

let userCard = document.getElementById("userCard");
userCard.setAttribute("username", requestedUsername);

let contentWrap = document.getElementById("contentWrap");
let mainWrap = document.getElementById("mainWrap");

await new Promise((r) => setTimeout(r, 1000));

let userContent = (
  await content.getContent(cookie.username, cookie.password, requestedUsername)
).reverse();

const createContentDisplay = async (index) => {
  let elem = document.createElement("n-content-display");
  await uiBuilder.ready(elem);
  await elem.component.display(
    userContent[index],
    userContent.length - 1 - index
  );
  contentWrap.appendChild(elem);
};

let contentIndex = 0;

do {
  await createContentDisplay(contentIndex++);
} while (mainWrap.clientHeight >= mainWrap.scrollHeight);
