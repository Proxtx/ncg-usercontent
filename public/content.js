import { auth } from "./meta.js";
import { getUserFile } from "../private/content.js";

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
  let user = await getUserFile(contentUsername);
  if (
    !(await auth(username, password)) ||
    (username != contentUsername &&
      !(user.data.access && user.data.access.includes(username)))
  )
    return;
  return await user.getContent();
};

export const deleteContent = async (username, password, index) => {
  if (!(await auth(username, password))) return;
  await (await getUserFile(username)).deleteContent(index);
};

export const hasAccess = async (username, password, contentUsername) => {
  let user = await getUserFile(contentUsername);
  if (
    !(await auth(username, password)) ||
    (username != contentUsername &&
      !(user.data.access && user.data.access.includes(username)))
  )
    return false;
  return true;
};
