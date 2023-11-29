const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");

router.use("/", userRouter);

module.exports = router;
