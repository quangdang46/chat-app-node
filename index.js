const express = require("express");
const ehbs = require("express-handlebars");

const app = express();

app.engine(
  "handlebars",
  ehbs.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.use(express.static("public"));
app.set("views", "./views");

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
