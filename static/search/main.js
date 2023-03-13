import * as _ from "/lib/guiLoader.js";
import { search } from "/lib/apiLoader.js";

let input = document.getElementById("queryField").component.input;
let userSuggestions = document.getElementById("userSuggestions");
let searchButton = document.getElementById("searchButton");
let user = document.getElementById("user");
user.innerText = decodeURI(cookie.username);
user.setAttribute("click", decodeURI(cookie.username));

searchButton.addEventListener("click", () => {
  applySearch();
});

input.addEventListener("change", async () => {
  applySearch();
});

const applySearch = async () => {
  userSuggestions.innerHTML = "";

  let users = await search.searchUsers(
    decodeURI(cookie.username),
    cookie.password,
    input.value
  );

  for (let user of users) {
    let elem = document.createElement("n-user");
    elem.innerText = user.firstName + " " + user.name;
    userSuggestions.appendChild(elem);
    elem.addEventListener("click", () => {
      window.location = "/user/?username=" + user.username;
    });
  }
};
