let authStore = {};
import { getUser } from "../private/users.js";

export const auth = async (username, password) => {
  if (!getUser(username)) return false;
  if (authStore[username] == password && authStore[username]) return true;
  let data = new FormData();
  data.append("username", username);
  data.append("password", password);
  let res;
  do {
    try {
      res = await (
        await fetch("https://abi.vtsem.de/auth", {
          body: data,
          method: "POST",
        })
      ).json();
    } catch {}
  } while (!res);
  if (res.success) authStore[username] = password;
  return res.success;
};
