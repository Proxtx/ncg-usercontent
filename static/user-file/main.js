import * as _ from "/lib/guiLoader.js";
import { content, userInfo } from "/lib/apiLoader.js";

while (!customElements.get("n-content-display"))
  await new Promise((r) => setTimeout(r, 10));

let requestedUsername = new URL(location.href).searchParams.get("username");

let userCard = document.getElementById("userCard");
userCard.setAttribute("username", requestedUsername);

let contentWrap = document.getElementById("contentWrap");
let mainWrap = document.getElementById("mainWrap");
let download = document.getElementById("download");

download.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  let blob = new Blob([userTextDocument]);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = URL.createObjectURL(blob);
  a.download = "user.txt";
  a.click();
});

const generateUrl = (id) => {
  if (id) return "https://ncg.proxtx.de/file.route/?id=" + id;
  return "https://ncg.proxtx.de/lib/img/loading.svg";
};

let info = await userInfo.getInfo(
  decodeURI(cookie.username),
  cookie.password,
  requestedUsername
);

let userContent = (
  await content.getContent(
    decodeURI(cookie.username),
    cookie.password,
    requestedUsername
  )
).reverse();

userContent.sort((content) => (content.favorite ? -1 : 0));
userContent = userContent;

let userTextDocument = "";

userTextDocument += generateUrl(info.info.picture);

userTextDocument += "\n" + info.user.firstName + " " + info.user.name;

userTextDocument += "\nHier Steckbrief";

const createContentDisplay = async (content) => {
  //if (index >= userContent.length) return false;
  let elem = document.createElement("n-content-display");
  await uiBuilder.ready(elem);
  await elem.component.display(content, 0, requestedUsername);
  contentWrap.appendChild(elem);
  return true;
};

let unused = [];
let use = [];
for (let v of userContent) {
  if (v.content.type == "image" && use.length < 21) use.push(v);
  else unused.push(v);
}

let textU = [];
let imageU = [];

for (let c of unused)
  if (c.content.type == "text") textU.push(c);
  else imageU.push(c);

unused = textU.concat(imageU);

console.log(unused);

for (let u of unused) {
  await createContentDisplay(u);
}

for (let u of use) {
  userTextDocument += "\n" + generateUrl(u.content.content);
}

userTextDocument = userTextDocument.replace(/\n/g, "\r\n");
