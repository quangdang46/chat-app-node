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
      await chat.save();
      res.status(200).json({
        message: "Chat saved successfully",
        chat,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = chatController;
