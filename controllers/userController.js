const bycrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Group = require("../models/Group");

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
    try {
      const users = await User.find({
        _id: { $nin: [req.session.userData._id] },
      });
      const objUsers = users.map((user) => user.toObject());
      // set header

      // group
      const groups = await Group.find({ owner_id: req.session.userData._id });
      const objGroups = groups.map((group) => group.toObject());
      res.render("home", {
        userData: req.session.userData,
        users: objUsers,
        groups: objGroups,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req, res, next) {
    try {
      const idUserReceive = req.body.idUserReceive;
      const userReceive = await User.findById(idUserReceive);
      const objUserReceive = userReceive.toObject();
      res.status(200).json({ userReceive: objUserReceive });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMember(req, res, next) {
    try {
      const idGroup = req.body.idGroup;
      // const user = await User.find({
      //   _id: { $nin: [req.session.userData._id] },
      // });

      const users = await User.aggregate([
        {
          $lookup: {
            from: "members",
            localField: "_id",
            foreignField: "user_id",
            as: "member",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          "$group_id",
                          new mongoose.Types.ObjectId(idGroup),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $match: {
            _id: {
              $nin: [new mongoose.Types.ObjectId(req.session.userData._id)],
            },
          },
        },
      ]);
      res.status(200).json({
        users,
        message: "success get member",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = userController;
