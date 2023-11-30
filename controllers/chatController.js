const Chat = require("../models/Chat");
const User = require("../models/User");

class chatController {
  static async saveChat(req, res, next) {
    try {
      const { message, sender, receiver } = req.body;
      const chat = new Chat({
        message,
        sender,
        receiver,
      });
      const newChat = await chat.save();
      const senderDetails = await User.findById(sender, "fullname image");
      const receiverDetails = await User.findById(receiver, "fullname image");

      // Attach sender and receiver details to newChat object
      newChat.sender = senderDetails;
      newChat.receiver = receiverDetails;

      res.status(200).send({
        success: true,
        message: "Chat saved successfully",
        newChat,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteChat(req, res, next) {
    try {
      const { idChat } = req.body;
      const deletedChat = await Chat.findByIdAndDelete(idChat);
      res.status(200).send({
        success: true,
        message: "Chat deleted successfully",
        deletedChat,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = chatController;
