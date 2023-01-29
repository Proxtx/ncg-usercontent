import { auth } from "../../public/meta.js";

export const server = async (document, options) => {
  if (!options.req.cookies.publicAuth) {
    options.res.redirect("https://zitate.proxtx.de/publicAuth.html");
    return;
  }
  if (
    !(await auth(options.req.cookies.username, options.req.cookies.password))
  ) {
    options.res.redirect("/login");
    return;
  }
  options.res.redirect("/search");
};
