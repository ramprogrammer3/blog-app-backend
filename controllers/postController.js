const User = require("../models/userModel");
const Post = require("../models/postModel");
exports.createPost = async(req,res)=>{

    try {

        // fetch data from body
        const {title,body} = req.body;

        // Todo Add image, upload from cloudinary

        // validating  data 
        if(!title || !body){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        // creating new post 
        const newPost = await Post.create({
            title,
            body
        })

        // updating user posts
        const updatedPost = await User.findByIdAndUpdate(req.user.id,{$push : {posts : newPost._id}},{new : true})

       // return response
       return res.status(200).json({
            success : true,
            message : "Post Created successfully",
            updatedPost
       })
        
    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }

}

exports.getAllPost = async(req,res)=>{
    try {

        // get All Post 
        const allPost = await Post.find({}).sort({createdAt : -1})
         
        return res.status(200).json({
            success : true,
            message : "All Post Fetched successfully",
            allPost
        })
        
    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

exports.updatePost = async(req,res)=>{
    try {
        const userId = req.user.id;
        const id = req.params.id;

        const {title,body,postImage} = req.body;

        // Todo upload image to cloudinary
        const updatedPost = await Post.findByIdAndUpdate(id,{
            title,body,postImage
        },{new : true})

        // return resposne
        return res.status(200).json({
            success : true,
            message : "Post updated successfully",
            updatedPost
        })
        
    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

exports.deletePost = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}