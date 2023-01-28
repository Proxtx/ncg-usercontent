import fs from "fs/promises";
import { resolve } from "path";

export const server = async (document, options) => {
  let id = options.req.query.id;
  let files = await fs.readdir("images");
  for (let fileName of files) {
    if (fileName.split(".")[0] == id) {
      options.res.status(200).sendFile(resolve("images/" + fileName));
      try {
        options.res.status(200).send(await fs.readFile("images/" + fileName));
      } catch {}
      return;
    }
  }
  options.res.status(404).sendFile("static/lib/img/image.svg");
};
