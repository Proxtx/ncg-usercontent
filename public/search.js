import { search } from "../private/users.js";
import { auth } from "./meta.js";

export const searchUsers = async (username, password, query) => {
  if (!(await auth(username, password))) return;
  return search(query);
};
