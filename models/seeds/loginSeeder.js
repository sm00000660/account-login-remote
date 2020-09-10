const mongoose = require("mongoose");
const Login = require("../login");

const usersList = require("./login.json");

mongoose.connect("mongodb://localhost/users-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  for (let i = 0; i < usersList.users.length; i++) {
    Login.create({
      firstName: `${usersList.users[i].firstName}`,
      email: `${usersList.users[i].email}`,
      password: `${usersList.users[i].password}`,
    });
  }
  console.log("mongoose connected");
});
