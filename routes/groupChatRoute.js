const express = require('express');
const groupChatController = require('../controllers/groupChatController');
const router = express.Router();




router.post("/save-group-message", groupChatController.saveGroupMessage);
router.post("/load-group-chat", groupChatController.loadChatGroup);

module.exports = router;