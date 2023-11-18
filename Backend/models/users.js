const mongoose = require("mongoose");
const Profile = require("../models/profile");
const Course = require("../models/course");

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

    publicId : {
        type : String,
        default : null
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
    
    resetPasswordtoken : {
        type : String,
    },

    resetPasswordExpires : {
        type : Date,
    }
})

userSchema.pre("remove", async function(next){
    try{
        const profileId = this.additionalDetails;
        await Profile.findByIdAndRemove(profileId);
        if(this.accountType === "Instructor")
        {
            await Promise.all(this.courses.map(async(course) =>await Course.findByIdAndRemove(course)));
        }
        else if(this.accountType === "Student")
        {
            await Promise.all(this.courses.map(async(course) => await Course.findByIdAndUpdate(course, {$pull : {students : this._id}})))
        }
        next();
    } catch(e)
    {
        throw new Error(e.message);
    }
})

module.exports = mongoose.model("User", userSchema);