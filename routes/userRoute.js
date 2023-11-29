const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const userController = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

router.get("/register", userController.renderRegister);

router.post("/register", userController.register);

router.get("/login", userController.renderLogin);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/home", userController.renderHome);

router.get("*", (req, res) => {
  res.redirect("/login");
});
module.exports = router;
