const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        title : String,
        required : true,
    },

    body : {
        type : String,
        required : true,
    },
    postImage : {
        type : String,
        default : "",
    },

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like"
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]

},{timestamps : true})

module.exports = mongoose.model("Post",postSchema);