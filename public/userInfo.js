import { auth } from "./meta.js";
import { getUserFile } from "../private/content.js";
import { getUser } from "../private/users.js";

export const getInfo = async (username, password, infoUsername) => {
  if (!(await auth(username, password))) return;
  return {
    info: await (await getUserFile(infoUsername)).getInfo(),
    user: getUser(infoUsername),
  };
};

export const userData = async (username, password, infoUsername) => {
  if (!(await auth(username, password))) return;
  return getUser(infoUsername);
};
