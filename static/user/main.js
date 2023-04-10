import * as _ from "/lib/guiLoader.js";
import { content } from "/lib/apiLoader.js";

let requestedUsername = new URL(location.href).searchParams.get("username");

let userCard = document.getElementById("userCard");
userCard.setAttribute("username", requestedUsername);

let addButton = document.getElementById("add");
let selectionWrap = document.getElementById("selectionWrap");
let selectorImage = document.getElementById("selectorImage");
let selectorText = document.getElementById("selectorText");
let textInput = document.getElementById("textInput");
let fileUpload = document.getElementById("fileUpload");
let fileUploadWrap = document.getElementById("fileUploadWrap");
let sendButton = document.getElementById("send");
let viewButton = document.getElementById("view");
let uploadNotice = document.getElementById("uploadNotice");
let fileUploadHint = document.getElementById("fileUploadHint");
let fileUploadHintImage = document.getElementById("fileUploadHintImage");
let back = document.getElementById("back");

if (
  !(await content.hasAccess(
    decodeURI(cookie.username),
    cookie.password,
    requestedUsername
  ))
)
  viewButton.style.display = "none";

back.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  location.href = "/search";
});

textInput.component.wrap.style.width = "100%";
textInput.component.wrap.style.height = "200px";

addButton.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  addButton.style.display = "none";
  viewButton.style.display = "none";
  selectionWrap.style.display = "flex";
  back.style.display = "none";
});

let contentType;

selectorImage.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  contentType = "image";
  selectionWrap.style.display = "none";
  fileUploadWrap.style.display = "unset";
  sendButton.style.display = "unset";
});

selectorText.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  contentType = "text";
  selectionWrap.style.display = "none";
  textInput.style.display = "unset";
  sendButton.style.display = "unset";
});

fileUpload.addEventListener("change", async () => {
  fileUploadHint.innerText = "Bilder ausgewählt.";
  fileUploadHintImage.style.display = "none";
});

sendButton.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  let originalText = uploadNotice.innerText;
  textInput.style.display = "none";
  fileUploadWrap.style.display = "none";
  uploadNotice.style.display = "unset";
  sendButton.style.display = "none";
  if (contentType == "image") {
    for (let fileIndex = 0; fileIndex < fileUpload.files.length; fileIndex++) {
      let file = fileUpload.files[fileIndex];
      uploadNotice.innerText =
        originalText +
        " " +
        (fileIndex + 1) +
        " von " +
        fileUpload.files.length +
        ".";
      let formData = new FormData();
      formData.append("image", file);
      let id = (
        await (
          await fetch("/upload/", {
            method: "POST",
            body: formData,
          })
        ).json()
      ).id;
      await content.addContent(
        decodeURI(cookie.username),
        cookie.password,
        requestedUsername,
        contentType,
        id
      );
    }
  } else if (contentType == "text") {
    await content.addContent(
      decodeURI(cookie.username),
      cookie.password,
      requestedUsername,
      contentType,
      textInput.component.input.value
    );
  }
  uploadNotice.style.display = "none";
  addButton.style.display = "unset";
  viewButton.style.display = "unset";
  uploadNotice.innerText = originalText;
  back.style.display = "unset";
});

viewButton.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  location.href = "/view/" + location.search;
});
