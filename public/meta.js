export const auth = async (username, password) => {
  let data = new FormData();
  data.append("username", username);
  data.append("password", password);
  let res;
  do {
    try{
    res = await (
    await fetch("https://abi.vtsem.de/auth", {
      body: data,
      method: "POST",
    })
  ).json();
      }
    catch {}
    }
  while(!res)
  return res.success;
};
