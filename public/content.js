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
  if (!(await hasAccess(username, password, contentUsername))) return false;
  return await (await getUserFile(contentUsername)).getContent();
};

export const deleteContent = async (username, password, index) => {
  if (!(await auth(username, password))) return;
  await (await getUserFile(username)).deleteContent(index);
};

export const hasAccess = async (username, password, contentUsername) => {
  if (!(await auth(username, password))) return false;
  if (
    (config.access[contentUsername] &&
      config.access[contentUsername].includes(username)) ||
    contentUsername == username
  )
    return true;
  return false;
};

export const favoriteContent = async (username, password, index, favorite) => {
  if (!(await auth(username, password))) return false;
  await (await getUserFile(username)).favoriteContent(index, favorite);
};
