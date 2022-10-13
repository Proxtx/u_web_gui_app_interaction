import { execute } from "../public/api.js";

export const server = async (_document, options) => {
  await execute(
    options.req.cookies.pwd ? options.req.cookies.pwd : options.req.query.pwd,
    options.req.query.appName,
    options.req.query.method,
    JSON.parse(options.req.query.arguments)
  );
};
