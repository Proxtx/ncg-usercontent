import fs from "fs/promises";
import { getUser, users } from "./users.js";
import config from "@proxtx/config";

let loadedFiles = {};

class File {
  constructor(username) {
    this.username = username;

    return (async () => {
      await this.load();
      await this.save();
      return this;
    })();
  }

  async getData() {
    if (Date.now() - this.time > 1000 * 60 * 5) {
      await this.load();
    }

    return this.data;
  }

  async load() {
    this.time = Date.now();

    try {
      this.data = JSON.parse(
        await fs.readFile("users/" + this.username + ".json", "utf8")
      );
    } catch (e) {
      console.log(
        "unable to load file:",
        "users/" + this.username + ".json",
        e
      );
      try {
        fs.access("users/" + this.username + ".json");
      } catch (e) {
        console.log("Access denied!", e);
        console.log("Retry!");
        await this.load();
        return;
      }

      console.log("access granted. Local retry.");
      this.data = JSON.parse(
        await fs.readFile("users/" + this.username + ".json", "utf8")
      );

      this.data = {
        username: this.username,
        content: [],
        info: {
          picture: null,
          info: {},
        },
      };
    }
  }

  async save() {
    await fs.writeFile(
      "users/" + this.data.username + ".json",
      JSON.stringify(this.data, null, 2)
    );

    this.time = Date.now();
  }

  async getUsername() {
    return (await this.getData()).username;
  }

  async getContent() {
    return (await this.getData()).content;
  }

  async getInfo() {
    return (await this.getData()).info;
  }

  async deleteContent(index) {
    (await this.getContent()).splice(index, 1);
    await this.save();
  }

  async favoriteContent(index, favorite) {
    (await this.getContent())[index].favorite = favorite;
    await this.save();
  }

  async appendContent(username, content) {
    (await this.getContent()).push({ time: Date.now(), username, content });
    await this.save();
  }

  async setPicture(id) {
    (await this.getInfo()).picture = id;
    await this.save();
  }

  async setInfo(name, info) {
    if (!config.infoPhrases.includes(name)) return;
    (await this.getInfo()).info[name] = info;
    await this.save();
  }
}

export const getUserFile = async (username) => {
  if (!loadedFiles[username])
    if (getUser(username)) loadedFiles[username] = await new File(username);
  return loadedFiles[username];
};
