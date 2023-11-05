
const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/auth");
const {createComment, deleteComment} = require("../controllers/commentController");

router.post("/createComment",auth,createComment);
router.post("/deleteComment",auth,deleteComment)


module.exports = router;