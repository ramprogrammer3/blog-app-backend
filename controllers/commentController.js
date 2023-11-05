
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async(req,res)=>{
    try {

        // fetch data from req .body
        // post == postId
        const {post,body} = req.body;

        // create comment
        const comment = new Comment({
            post,body,user:req.user.name
        })

        // sava the new comment into the databasse

        const savedComment = await comment.save();

        // find the psot by ID, and the new comment id is added in comments array

        const updatedPost = await Post.findByIdAndUpdate(post,{$push : {comments : savedComment._id}},{new : true}).populate("comments").populate("likes").exec();

        res.status(200).json({
            success : true,
            message : "Comment added",
            updatedPost
        })

        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.deleteComment = async(req,res)=>{
    try {
        // get comment id and post id from body
        const {post, comment} = req.body;

        // delete from comment database
        const deletedComment = await Comment.findOneAndDelete({post : post,_id : comment});

        // update post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull : deletedComment._id}).populate("likes").populate("comments").exec();

        // return resposne
        return res.status(200).json({
            success : true,
            message : "comment deleted successfully",
            updatedPost
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}