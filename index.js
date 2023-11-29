const express = require("express");
const ehbs = require("express-handlebars");
const startDB = require("./databases/connect");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();

// connect db
startDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  ehbs.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

// router
app.use("/", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
