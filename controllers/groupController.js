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

      const newMember = new Member({
        group_id: newGroup._id,
        user_id: _id,
      });

      await newMember.save();

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

  static async searchGroup(req, res, next) {
    try {
      const { id } = req.body;
      const group = await Group.findOne({ _id: id });
      if (!group) {
        res.status(404).json({ message: "Group not found", success: false });
      } else {
        const totalMember = await Member.countDocuments({ group_id: id });
        console.log(totalMember);
        const avilable = group.limit - totalMember;
        const isJoiner = await Member.findOne({
          group_id: id,
          user_id: req.session.userData._id,
        }).count();

        const isOwner = group.owner_id == req.session.userData._id;
        const groupObj = group.toObject();
        res.status(200).json({
          message: "success get group",
          success: true,
          group: groupObj,
          totalMember,
          avilable,
          isJoiner,
          isOwner,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = groupController;
