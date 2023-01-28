import { auth } from "../public/meta.js";
import { extname } from "path";
import fs from "fs/promises";

export const uploadHandler = async (req, res) => {
  if (!(await auth(req.cookies.username, req.cookies.password))) return;
  let file = req.files.image;
  let ext = extname(file.name);
  let id = Math.floor(Math.random() * 10000000);
  let filePath = "images/" + id + ext;
  await fs.writeFile(filePath, file.data);
  res.status(200).send({
    success: true,
    id,
  });
};
