import { auth } from "../../public/meta.js";

export const server = async (document, options) => {
  if (
    !(await auth(options.req.cookies.username, options.req.cookies.password))
  ) {
    options.res.redirect("/login");
    return;
  }
  options.res.redirect("/search");
};
