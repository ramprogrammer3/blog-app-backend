
const User = require("../models/userModel");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
    try {
        // fetch data from req.body
        const {name, email,password} = req.body;
        // validate user input
        if(!name || !email || !password){
            return res.status(400).json({
                success :false,
                message : "All fields are required"
            })
        }

        // check if user is already register
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success :false,
                message : "User is already exist with this email, please login"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        // Todo Upload image to cloudinary and append url in image 

        let image = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`
        // create user
        const user = await User.create({
            name,
            email,
            password : hashPassword,
            image
        })

        // return response

        return res.status(200).json({
            success : true,
            message : "User created successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.login = async(req,res)=>{
    try {
        // fetch email and password from req.body
        const {email,password} = req.body;
        // validate
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        // check user is exist or not

        const user = await User.findOne({email}).populate("posts");

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User is not register, please register first"
            })
        }

        // compare password is correct or not
        
        
        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({
                success : false,
                message : "Password is incorrect"
            })
        }

        // create token
        const token = jwt.sign({email : user.email,id : user._id},"ramkumarsha256",{
            expiresIn : "30d"
        })

        // remove password from user 
        user.password = undefined;
        user.token = token;

        const options = {
            httpOnly : true
        }

        // return response
        return res.cookie("token",token,options).status(200).json({
            success : true,
            message : "Login successful",
            token,
            user

        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }

}
exports.update = async(req,res)=>{
    try {
        // find id from params
        const id = req.params.id;
        // fetch data from body;
        const {name,email,password,image} = req.body;

        // Todo to upload image to cloudinary
        
        // query for update user detials
        const updateUser = await User.findByIdAndUpdate(id,{name,email,password,image},{new :true})

        // return resposne  for successful update

        return res.status(200).json({
            success : true,
            message : "User updated successfully",
            updateUser
        })
      
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

exports.deleteUser = async(req,res)=>{
    try {

        const id = req.params.id;

            await User.findByIdAndDelete(id);

            res.send({
                message : "account delete successfully"
            })
  
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}