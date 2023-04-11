import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import { setConfig } from "@proxtx/framework/static.js";
import fileUpload from "express-fileupload";
import { uploadHandler } from "./private/fileUpload.js";

setConfig({
  ignoreParseHtml: ["/lib/components"],
  customScriptFileExtensions: [".html", ".route"],
  logs: false,
});

let result = await listen(config.port);
result.app.use(fileUpload());
result.app.post("/upload", uploadHandler);
console.log("Server Started. Port:", config.port);
