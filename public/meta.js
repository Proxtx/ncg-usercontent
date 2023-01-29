let authStore = {};

export const auth = async (username, password) => {
  if (authStore[username] == password) return true;
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
