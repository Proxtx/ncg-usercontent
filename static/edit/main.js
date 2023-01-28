import { content } from "/lib/apiLoader.js";

let phrases = await content.getInfoPhrases(cookie.username, cookie.password);

console.log(phrases);
