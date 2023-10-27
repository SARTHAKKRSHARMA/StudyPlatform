const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_SECRET_KEY
});


function calculateChecksum(fileBuffer) {
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    return hash.digest('hex');
}
async function isFileIdentical(newFileBuffer, existingFilePublicId) {
    const newFileChecksum = calculateChecksum(newFileBuffer);
  
    // Retrieve the existing file's checksum from Cloudinary
    const existingFile = await cloudinary.api.resource(existingFilePublicId);
    const existingFileChecksum = existingFile.signature;
  
    return newFileChecksum === existingFileChecksum;
}

module.exports = {isFileIdentical};