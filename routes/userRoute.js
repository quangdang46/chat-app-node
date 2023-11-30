const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

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

router.get("/register", auth.is_logout, userController.renderRegister);

router.post("/register", userController.register);

router.get("/login",auth.is_logout, userController.renderLogin);

router.post("/login", userController.login);

router.get("/logout", auth.is_login, userController.logout);

router.get("/home",auth.is_login, userController.renderHome);

router.post("/getprofile",auth.is_login, userController.getProfile);

router.get("*", (req, res) => {
  res.redirect("/login");
});
module.exports = router;
