const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");

router.post("/add-members",memberController.addMembers)

module.exports = router;
