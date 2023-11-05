require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const likeRoutes = require("./routes/likeRoute");
const commentRoutes = require("./routes/commentRoute");
const cors = require("cors");
const fileUploader = require("express-fileupload");
const cookieParser = require('cookie-parser');
const {cloudinaryConnect} = require("./config/cloudinary")

const app = express();

const port = process.env.port || 4040;

app.use(express.json({limit : '1024mb'}));
app.use(cors());
app.use(fileUploader());
app.use(cookieParser());


app.get("/",(req,res)=>{
   res.send({
    message  : "server is running , everything is fine "
   })
})

// connectiong to Cloudinary
cloudinaryConnect();

// routes
app.use("/api/v1/user",userRoutes);

// routes for post 
app.use("/api/v1/post",postRoutes)

// like routes
app.use("/api/v1",likeRoutes);

// comment routes
app.use("/api/v1",commentRoutes);

// db connection
connection();

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})