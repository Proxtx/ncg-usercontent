import { auth } from "./meta.js";
import { getUserFile } from "../private/content.js";
import config from "@proxtx/config";
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

export const getInfoPhrases = async (username, password) => {
  if (!(await auth(username, password))) return;
  return config.infoPhrases;
};

export const setInfoPhrase = async (username, password, phrase, value) => {
  if (!(await auth(username, password))) return;
  await (await getUserFile(username)).setInfo(phrase, value);
};

export const setInfoPicture = async (username, password, id) => {
  if (!(await auth(username, password))) return;
  await (await getUserFile(username)).setPicture(id);
};
