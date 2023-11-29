const express = require("express");
const ehbs = require("express-handlebars");
const startDB = require("./databases/connect");
const bodyParser = require("body-parser");
const app = express();

// connect db
startDB();

app.engine(
  "handlebars",
  ehbs.engine({
    defaultLayout: "main",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.set("views", "./views");

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
