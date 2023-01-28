import { auth } from "./meta.js";
import { getUserFile } from "../private/content.js";
import config from "@proxtx/config";

export const addContent = async (
  username,
  password,
  contentUsername,
  contentType,
  content
) => {
  if (!(await auth(username, password))) return;
  await (
    await getUserFile(contentUsername)
  ).appendContent(username, {
    type: contentType,
    content,
  });
};

export const getContent = async (username, password, contentUsername) => {
  if (!(await auth(username, password))) return;
  return await (await getUserFile(contentUsername)).getContent();
};

export const getInfoPhrases = async (username, password) => {
  //if (!(await auth(username, password))) return;
  return config.infoPhrases;
};

export const deleteContent = async (username, password, index) => {
  if (!(await auth(username, password))) return;
  await (await getUserFile(username)).deleteContent(index);
};