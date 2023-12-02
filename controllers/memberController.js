const Group = require("../models/Group");
const Member = require("../models/Member");

class memberController {
  static async addMembers(req, res, next) {
    try {
      const { idGroup, members, limit } = req.body;
      if (!idGroup || !members || !limit) {
        return res
          .status(400)
          .json({ message: "Missing required fields", success: false });
      }

      if (members.length > limit) {
        return res
          .status(400)
          .json({ message: "Members limit exceeded", success: false });
      }

      await Member.deleteMany({ group_id: idGroup });
      let data = [];
      for (let i = 0; i < members.length; i++) {
        data.push({
          group_id: idGroup,
          user_id: members[i],
        });
      }

      await Member.insertMany(data);

      // find group
      const group = await Group.findOne({ _id: idGroup });
      // find members in group except current user
      const membersInGroup = await Member.find({
        group_id: idGroup,
        user_id: { $ne: req.session.userData._id },
      }).populate("user_id");

      const groupObj = group.toObject();
      const membersInGroupObj = membersInGroup.map((member) => {
        return member.user_id.toObject();
      });
      res
        .status(200)
        .json({
          message: "Members added",
          success: true,
          group: groupObj,
          members: membersInGroupObj,
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = memberController;
