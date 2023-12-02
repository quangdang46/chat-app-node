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

  static async loadChatGroup(req, res) {
    try {
      const { group_id } = req.body;
      const chats = await GroupChat.find({ group_id }).populate(
        "sender_id",
        "fullname image"
      );
      res.status(200).json({
        message: "Load chat group successfully",
        chats,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }

  static async deleteGroupMessage(req, res) {
    try {
      const { idChat } = req.body;
      await GroupChat.findByIdAndDelete({ _id: idChat });
      res.status(200).json({
        message: "Delete message successfully",
        success: true,
      });
    } catch (error) {}
  }

  static async updateGroupMessage(req, res) {
    try {
      const { idGroupChat, message } = req.body;
      await GroupChat.findByIdAndUpdate(
        { _id: idGroupChat },
        {
          $set: {
            message,
          },
        }
      );
      res.status(200).json({
        message: "Update message successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }
}

module.exports = groupChatController;
