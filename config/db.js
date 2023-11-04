const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.url;

const connectDB = () =>{
    mongoose.connect(url,{
        // useNewUrlParser : true,
        // useUnifiedTopology : true,
    }).then(()=>{
        console.log("DB connection successful");
    }).catch((error)=>{
        console.log("DB connection failed")
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = connectDB;