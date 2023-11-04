
const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {createPost,getAllPost,updatePost,deletePost} = require("../controllers/postController")

router.post("/createPost",auth,createPost);
router.get("/getAllPost",getAllPost);
router.put("/updatePost/:id",auth,updatePost)
router.put("/deletePost/:id",auth,deletePost);

module.exports = router;