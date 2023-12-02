const GroupChat = require("../models/GroupChat");

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

      res.status(200).json({
        message: "Message sent successfully",
        data: dataChat,
        chat: groupChat,
        success: true,
      });
    } catch (error) {}
  }
}

module.exports = groupChatController;
