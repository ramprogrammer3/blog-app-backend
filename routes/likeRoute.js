const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth")

const {like,unlike} = require("../controllers/likeController");

router.post("/like",auth,like);
router.post("/unlike",auth,unlike);

module.exports = router;
