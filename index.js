require("dotenv").config();
const express = require("express");
const connection = require("./config/db");

const app = express();

const port = process.env.port || 5000;

app.get("/",(req,res)=>{
   res.send({
    message  : "server is running , everything is fine "
   })
})

// db connection
connection();

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})