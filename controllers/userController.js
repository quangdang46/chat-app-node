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
}

module.exports = userController;
