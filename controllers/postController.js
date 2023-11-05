const User = require("../models/userModel");
const Post = require("../models/postModel");
const uploader = require("../uploader");
exports.createPost = async(req,res)=>{

    try {

        // fetch data from body
        const {title,body} = req.body;

        // Todo Add image, upload from cloudinary
        let {image} = req.body;
        if(image){
            const profileImage = await uploader(image,"blogApp",30);
            image = profileImage.secure_url;
        }

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
            body,
            postImage : image
        })

        // updating user posts
        const updatedPost = await User.findByIdAndUpdate(req.user.id,{$push : {posts : newPost._id}},{new : true}).populate('posts').exec();

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
        const allPost = await Post.find({}).sort({createdAt : -1}).populate("likes").populate("comments").exec();
         
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
        const id = req.params.id;

        const {title,body} = req.body;

        // Todo upload image to cloudinary
        const {image} = req.body;
        if(image){
            const profileImage = await uploader(image,"blogApp",30);
            image = profileImage.secure_url;
        }

        const updatedPost = await Post.findByIdAndUpdate(id,{
            title,body,postImage:image
        },{new : true}).populate("likes").populate('comments').exec();

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
        const userId = req.user.id;
        const id = req.params.id;

        const updatedPost = await User.findByIdAndUpdate(userId,{$pull : {posts : id}},{new : true}).populate("posts").exec();

        // delete post
        await Post.findByIdAndDelete(id);

        // return response
        return res.status(200).json({
            success : true,
            message : "Post Deleted successfully",
            updatedPost
        })

        
    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

exports.searchPost = async(req,res)=>{
    const keyword = req.query.search ?
    {
        $or : [
            {body : {$regex : req.query.search, $options : "i"}},
            {title : {$regex : req.query.search, $options : "i"}},
        ]
        
    }
    :
    {}

    const posts = (await Post.find(keyword))
    res.send(posts)
}
