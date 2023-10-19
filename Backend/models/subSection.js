const mongoose = require("mongoose");

const subSection = new mongoose.Schema({
    title : {
        type : String, 
        required: true,
        maxLength : 100
    },

    timeDuration : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true,
        maxLength : 1000
    },

    videoUrl : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model("SubSection", subSection);