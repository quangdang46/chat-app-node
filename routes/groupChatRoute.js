const express = require('express');
const groupChatController = require('../controllers/groupChatController');
const router = express.Router();




router.post("/save-group-message", groupChatController.saveGroupMessage);
router.post("/load-group-chat", groupChatController.loadChatGroup);
router.post("/delete-group-message", groupChatController.deleteGroupMessage);
router.post("/update-group-message", groupChatController.updateGroupMessage);

module.exports = router;