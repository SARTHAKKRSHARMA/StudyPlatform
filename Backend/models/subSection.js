const mongoose = require("mongoose");
const {contentDestroyer} = require("../utils/uploadImage");

const subSection = new mongoose.Schema({
    title : {
        type : String, 
        required: true,
        maxLength : 100
    },

    timeDuration : {
        type : String,
    },

    description : {
        type : String,
        required : true,
        maxLength : 1000
    },

    videoUrl : {
        type : String,
        required : true
    },

    publicId : {
        type : String,
        unique : true
    }
})


subSection.pre("remove", async function(next) {
    try
    {
        await contentDestroyer(this.publicId);
        next();
    } catch(e)
    {
        throw new Error("Failed to delete resource");
    }
})

module.exports = mongoose.model("SubSection", subSection);