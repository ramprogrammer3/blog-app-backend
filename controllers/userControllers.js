
const User = require("../models/userModel");

const bcrypt = require('bcrypt');

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

}
exports.update = async(req,res)=>{

}

exports.deleteUser = async(req,res)=>{

}