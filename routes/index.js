const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const chatRouter = require("./chatRoute");

router.use("/", userRouter);
router.use("/", chatRouter);

module.exports = router;
