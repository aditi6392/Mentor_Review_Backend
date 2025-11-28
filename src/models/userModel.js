const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

class UserModel {
  static async createUser(userObj) {
    const users = await this.getAllUsers();
    users.push(userObj);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return userObj;
  }

  static async getAllUsers() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
}

module.exports = UserModel;
