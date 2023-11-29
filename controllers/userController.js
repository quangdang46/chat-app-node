const bycrypt = require("bcrypt");

const User = require("../models/User");

class userController {
  static async renderRegister(req, res, next) {
    res.render("register");
  }

  static async register(req, res, next) {
    try {
      const { fullname, username, password } = req.body;
      const passwordHash = await bycrypt.hash(password, 10);

      const newUser = new User({
        fullname,
        username,
        password: passwordHash,
      });
      await newUser.save();

      res.status(200).json({ message: "success register" });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async renderLogin(req, res, next) {
    res.render("login");
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await User.findOne({ username });
      if (!userData) {
        return res.status(400).json({ message: "Invalid username" });
      }
      const isPasswordValid = await bycrypt.compare(
        password,
        userData.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      req.session.userData = userData;
      res.status(200).json({ message: "success login" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async logout(req, res, next) {
    try {
      req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async renderHome(req, res, next) {
    console.log(req.session.userData);
    res.render("home", { userData: req.session.userData });
  }
}

module.exports = userController;
