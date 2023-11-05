const cloudinary = require("cloudinary").v2;

const uploader = async(file,folder,quality)=>{
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type  = "auto";
    return await cloudinary.uploader.upload(file,options);
}

module.exports = uploader;