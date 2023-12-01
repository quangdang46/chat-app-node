const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");
const router = express.Router();

const groupController = require("../controllers/groupController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

router.post("/group", upload.single("imageGroup"), groupController.createGroup);
router.post(
  "/update-group",
  upload.single("imageGroupUpdate"),
  groupController.updateGroup
);


router.post("/delete-group", groupController.deleteGroup);

router.post("/search-group", groupController.searchGroup);
module.exports = router;
