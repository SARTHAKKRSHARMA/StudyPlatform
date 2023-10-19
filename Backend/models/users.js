const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },

    lastName : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique:true,
        trim : true,
        match : /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    },

    password : {
        type : String,
        required : true,
        minlength : 10
    },

    accountType : {
        type : String,
        enum : ["Admin", "Student", "Instructor"],
        required : true
    },

    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Profile",
    },

    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    ],

    image : {
        type : String,
        required : true
    },

    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
        }
    ],
     
    token : {
        type : String,
    },

    resetPasswordExpires : {
        type : Date,
    }
})


module.exports = mongoose.model("User", userSchema);