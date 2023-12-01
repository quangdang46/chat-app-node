const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const chatRouter = require("./chatRoute");
const groupRouter = require("./groupRoute");

router.use("/", userRouter);
router.use("/", chatRouter);
router.use("/", groupRouter);

module.exports = router;
