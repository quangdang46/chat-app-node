const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const chatRouter = require("./chatRoute");
const groupRouter = require("./groupRoute");
const memberRouter = require("./memberRoute");


router.use("/", userRouter);
router.use("/", chatRouter);
router.use("/", groupRouter);
router.use("/", memberRouter);

router.get("*", (req, res) => {
  res.redirect("/login");
});
module.exports = router;
