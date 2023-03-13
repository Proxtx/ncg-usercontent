import { userInfo } from "/lib/apiLoader.js";

let phrases = await userInfo.getInfoPhrases(
  decodeURI(cookie.username),
  cookie.password
);
let info = await userInfo.getInfo(
  decodeURI(cookie.username),
  cookie.password,
  decodeURI(cookie.username)
);
let done = document.getElementById("done");
let contentWrap = document.getElementById("contentWrap");
let overwrite = document.getElementById("overwrite");
let infoDivider = document.getElementById("infoDivider");
let fileUpload = document.getElementById("fileUpload");
let fileUploadHint = document.getElementById("fileUploadHint");
let fileUploadHintImage = document.getElementById("fileUploadHintImage");

fileUpload.addEventListener("change", async () => {
  fileUploadHint.innerText = "Bitte Warten";
  fileUploadHintImage.style.display = "none";
  let formData = new FormData();
  formData.append("image", fileUpload.files[0]);
  let id = (
    await (
      await fetch("/upload/", {
        method: "POST",
        body: formData,
      })
    ).json()
  ).id;

  await userInfo.setInfoPicture(
    decodeURI(cookie.username),
    cookie.password,
    id
  );
  redirect();
});

for (let phrase of phrases) {
  let elem = document.createElement("m-text-input");
  await uiBuilder.ready(elem);
  elem.setAttribute("placeholder", phrase);
  elem.component.value = info.info.info[phrase] ? info.info.info[phrase] : "";
  elem.addEventListener("change", async () => {
    await userInfo.setInfoPhrase(
      decodeURI(cookie.username),
      cookie.password,
      phrase,
      elem.component.value
    );
  });

  contentWrap.insertBefore(elem, infoDivider);
}

done.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  redirect();
});

const redirect = () => {
  location.href = "/user/?username=" + decodeURI(cookie.username);
};

overwrite.component.component.findAndApplyCascadingVars();
