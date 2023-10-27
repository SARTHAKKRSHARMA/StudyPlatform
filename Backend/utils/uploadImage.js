const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_SECRET_KEY
});

exports.imageUploader = async function(file, folder, height=null, quality=null)
{
    try
    {
        console.log(cloudinary.v2);
        const options = {
            use_filename : true,
            unique_filename : false,
            folder,
            resource_type : "auto"
        }

        if(height) options.height = height;
        if(quality) options.quality = quality;
        const response = await cloudinary.uploader.upload(file, options);
        return response;
    } catch(e)
    {
        throw new Error(e.message);
    }
}


exports.contentDestroyer = async function(publicId)
{
    try
    {
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch(e)
    {
        throw new Error(e.message);
    }
}