import * as _ from "/lib/guiLoader.js";
import { content } from "/lib/apiLoader.js";

let requestedUsername = new URL(location.href).searchParams.get("username");

let userCard = document.getElementById("userCard");
userCard.setAttribute("username", requestedUsername);

let contentWrap = document.getElementById("contentWrap");
let mainWrap = document.getElementById("mainWrap");
let back = document.getElementById("back");

back.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  location.href = "/user/" + location.search;
});

let userContent = (
  await content.getContent(cookie.username, cookie.password, requestedUsername)
).reverse();

const createContentDisplay = async (index) => {
  if (index >= userContent.length) return false;
  let elem = document.createElement("n-content-display");
  await uiBuilder.ready(elem);
  await elem.component.display(
    userContent[index],
    userContent.length - 1 - index, requestedUsername
  );
  contentWrap.appendChild(elem);
  return true;
};

let contentIndex = 0;

do {
  if (!(await createContentDisplay(contentIndex++))) break;
} while (mainWrap.clientHeight >= mainWrap.scrollHeight);

mainWrap.addEventListener("scroll", async () => {
  while (
    mainWrap.clientHeight + mainWrap.scrollTop + 200 >=
    mainWrap.scrollHeight
  )
    if (!(await createContentDisplay(contentIndex++))) return;
});
