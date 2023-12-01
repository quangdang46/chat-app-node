const Group = require("../models/Group");
const Member = require("../models/Member");
class groupController {
  static loadGroup(req, res, next) {}

  static async createGroup(req, res, next) {
    try {
      const { name, limit } = req.body;
      const { _id } = req.session.userData;
      const image = req.file ? req.file.filename : "group.jpg";
      const newGroup = new Group({
        owner_id: _id,
        name,
        image,
        limit,
      });
      await newGroup.save();

      res.status(200).json({ message: "success create group", newGroup });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateGroup(req, res, next) {
    try {
      const { name, limit, idGroup, lastLimit } = req.body;
      const image = req.file ? req.file.filename : "group.jpg";

      if (parseInt(limit) < parseInt(lastLimit)) {
        await Member.deleteMany({ group_id: idGroup });
      }

      const newGroup = await Group.findByIdAndUpdate(
        { _id: idGroup },
        {
          $set: {
            name,
            image,
            limit,
          },
        }
      );
      const newGroupUpdate = await Group.findOne({ _id: idGroup });
      const newGroupObj = newGroupUpdate.toObject();
      res.status(200).json({
        message: "success update group",
        success: true,
        newGroup: newGroupObj,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteGroup(req, res, next) {
    try {
      const { idGroup } = req.body;
      await Group.deleteOne({ _id: idGroup });
      await Member.deleteMany({ group_id: idGroup });
      res.status(200).json({ message: "success delete group", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = groupController;
