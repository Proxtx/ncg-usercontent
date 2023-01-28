import fs from "fs/promises";

export const users = (await fs.readFile("users.csv", "utf8"))
  .split("\n")
  .map((value) => {
    let properties = value.split(",");
    if (properties.length < 2) return;
    if (properties[3][0] == '"') {
      properties[3] = properties[3].substring(1, properties[3].length - 1);
    }
    if (properties[2][0] == '"') {
      properties[2] = properties[2].substring(1, properties[2].length - 1);
    }
    return {
      id: properties[0],
      username: properties[1],
      name: properties[2],
      firstName: properties[3],
    };
  });

if (!users[users.length - 1]) {
  users.pop();
}

export const search = (query) => {
  query = query.toLowerCase();
  let foundUsers = [];
  for (let user of users) {
    if ((user.firstName + " " + user.name).toLocaleLowerCase().includes(query))
      foundUsers.push(user);
  }

  return foundUsers;
};

export const getUser = (username) => {
  for (let user of users) {
    if (user.username == username) return user;
  }

  return false;
};
