import * as _ from "/lib/guiLoader.js";
import { search } from "/lib/apiLoader.js";

let input = document.getElementById("queryField").component.input;
let userSuggestions = document.getElementById("userSuggestions");

input.addEventListener("change", async () => {
  userSuggestions.innerHTML = "";

  let users = await search.searchUsers(
    cookie.username,
    cookie.password,
    input.value
  );

  for (let user of users) {
    let elem = document.createElement("n-user");
    elem.innerText = user.firstName + " " + user.name;
    userSuggestions.appendChild(elem);
  }
});
