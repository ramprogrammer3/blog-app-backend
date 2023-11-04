require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const cors = require("cors");
const fileUploader = require("express-fileupload");
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());
app.use(fileUploader());
app.use(cookieParser());



app.get("/",(req,res)=>{
   res.send({
    message  : "server is running , everything is fine "
   })
})

// routes
app.use("/api/v1/user",userRoutes);

// routes for post 
app.use("/api/v1/post",postRoutes)

// db connection
connection();

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})