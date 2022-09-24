import { auth } from "../public/meta.js";

export const server = async (_document, options) => {
  if (await auth(options.req.cookies.pwd)) options.res.redirect("main");
  else options.res.redirect("login");
};
