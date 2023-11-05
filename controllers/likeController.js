
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.like = async(req,res)=>{
    try {
        // get post id
        const {post} = req.body;
      
        // create like 
       const like = new Like({
            post,
            user:req.user.name
       })

       // save like in databse
       const savedLike = await like.save();
        

        // update likes array in post database
        const updatedPost = await Post.findByIdAndUpdate(post,{$push : {likes : savedLike._id}},{new : true}).populate("likes").populate("comments").exec();
        
        // return response 

        return res.status(200).json({
            success : true,
            message : "Liked",
            updatedPost
        })

        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.unlike = async(req,res)=>{
    try {
        // find post id and like id from body
        const {post,like} = req.body;

        // find and delete from like array
        // jis first entry ke andhar dono id hoga usse delete kar denge
        const deletedLike = await Like.findOneAndDelete({post : post, _id : like});

        // update post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull : {likes : deletedLike._id}},{new : true}).populate("likes").populate('comments').exec();

        // return resposne
        return res.status(200).json({
            success : true,
            message : "unlike",
            updatedPost
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}