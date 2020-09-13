const usersList = require("./models/seeds/login.json");
const users = usersList.users;

function userCheck(userInput) {
  let userInfo = {};
  for (let i = 0; i < users.length; i++) {
    if (
      userInput.email === users[i].email &&
      userInput.password === users[i].password
    ) {
      userInfo = users[i];
    }
    console.log(userInput);
    console.log(userInfo);
  }
  return userInfo;
}

module.exports = userCheck;
