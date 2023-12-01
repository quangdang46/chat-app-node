const Group = require("../models/Group");

class groupController {
  static loadGroup(req, res, next) {}

  static async createGroup(req, res, next) {
    try {
      const { name, limit } = req.body;
      const { _id } = req.session.userData;
      const image = req.file ? req.file.filename : "group.jpg";
      console.log({ name, limit, _id, image });
      const newGroup = new Group({
        owner_id: _id,
        name,
        image,
        limit,
      });
      await newGroup.save();

      res.status(200).json({ message: "success create group" ,newGroup});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = groupController;
