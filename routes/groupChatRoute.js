const express = require('express');
const groupChatController = require('../controllers/groupChatController');
const router = express.Router();




router.post("/save-group-message", groupChatController.saveGroupMessage);

module.exports = router;