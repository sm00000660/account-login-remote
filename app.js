const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
