const cloudinary = require('cloudinary').v2;
require("dotenv").config();
         

const cloudinaryConnect = async () => 
{
  try
  {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_SECRET_KEY
    });
    console.log(cloudinary);
  } catch(e)
  {
    console.log("Error");
  }
}


module.exports = cloudinaryConnect