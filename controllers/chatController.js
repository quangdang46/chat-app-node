const Chat = require("../models/Chat");

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
      res.status(200).send({
        success: true,
        message: "Chat saved successfully",
        newChat,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = chatController;
