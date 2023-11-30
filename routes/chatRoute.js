const express = require("express");
const Chat = require("../models/Chat");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/save-message", chatController.saveChat);

module.exports = router;
