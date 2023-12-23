const mongoose = require("mongoose");

const courseProgress = mongoose.Schema({
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    completedVideos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubSection"
    }]  
})

module.exports = mongoose.model("CourseProgress", courseProgress);