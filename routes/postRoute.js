
const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {createPost,getAllPost,updatePost,deletePost, searchPost} = require("../controllers/postController")

router.post("/createPost",auth,createPost);
router.get("/getAllPost",getAllPost);
router.put("/updatePost/:id",auth,updatePost)
router.delete("/deletePost/:id",auth,deletePost);
router.get("/",searchPost)

module.exports = router;