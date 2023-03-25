import { meta } from "../lib/apiLoader.js";

const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

if (!cookie.username && cookie.publicAuth) {
  let publicAuth = JSON.parse(decodeURIComponent(cookie.publicAuth));
  cookie.username = encodeURI(publicAuth.username);
  cookie.password = publicAuth.password;
}

if (
  cookie.username &&
  cookie.password &&
  (await meta.auth(decodeURI(cookie.username), cookie.password))
) {
}
//location.pathname = "/";

loginButton.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 500));
  cookie.username = encodeURI(username.component.value.trim());
  cookie.password = password.component.value;
  if (!(await meta.auth(username.component.value.trim(), password.component.value)))
    alert("Benutzername oder Passwort ist falsch.  |"+cookie.username+"|,  |"+cookie.password+"|");
  else {
    location.pathname = "/";
  }
});
