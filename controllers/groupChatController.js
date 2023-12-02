const GroupChat = require("../models/GroupChat");
const User = require("../models/User");

class groupChatController {
  static async saveGroupMessage(req, res) {
    try {
      const { message, sender_id, group_id } = req.body;

      const groupChat = new GroupChat({
        message,
        sender_id,
        group_id,
      });

      await groupChat.save();

      const dataChat = await GroupChat.findOne({
        _id: groupChat._id,
      }).populate("sender_id", "fullname image");

      const dataCurrentUser = await User.findOne({
        _id: req.session.userData._id,
      });
      res.status(200).json({
        message: "Message sent successfully",
        data: dataChat,
        chat: groupChat,
        success: true,
        currentUser: dataCurrentUser,
      });
    } catch (error) {}
  }
}

module.exports = groupChatController;
