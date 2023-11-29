const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    // gui
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // nhan
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
