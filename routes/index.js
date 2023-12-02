const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const chatRouter = require("./chatRoute");
const groupRouter = require("./groupRoute");
const memberRouter = require("./memberRoute");
const groupChatRouter = require("./groupChatRoute");

router.use("/", userRouter);
router.use("/", chatRouter);
router.use("/", groupRouter);
router.use("/", memberRouter);
router.use("/", groupChatRouter);

router.get("*", (req, res) => {
  res.redirect("/login");
});
module.exports = router;
