const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const Login = require("./models/login");
const userCheck = require("./loginCheck");

mongoose.connect("mongodb://localhost/users-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongoose connected");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const userInput = req.body;
  const userInfo = userCheck(req.body);
  const fault = "Incorrect username or password.";

  if (userInfo.firstName !== undefined) {
    res.render("welcome", { userInfo: userInfo });
  } else {
    res.render("index", { userInput: userInput, fault: fault });
  }
});

// app.post("/", (req, res) => {
// const email = req.body.email;
// const password = req.body.password;
//   const userInput = req.body;
//   Login.find()
//     .lean()
//     .then((users) => {
//       if (users.email !== email) {
//         alert("此信箱未被註冊");
//       } else if (users.password !== password) {
//         alert("密碼錯誤");
//       }
//     })
//     .then((user) => res.render("welcome", { user }));
//   console.log(email);
//   console.log(password);
// });

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
