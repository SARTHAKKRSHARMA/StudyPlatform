const mongoose = require("mongoose");
const User = require("./users");
const Section = require("./section")

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String, 
        trim : true,
        maxLength : 200,
        required : true
    },

    courseDescription : {
        type : String, 
        trim : true,
        maxLength : 1500,
        required : true
    },

    requirements : [{
        type : String
    }],

    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User",
        required : true
    },

    whatYouWillLearn : {
        type : String,
        trim:true,
        maxLength : 3000,
        required : true
    },

    courseContent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
    }],

    ratingAndReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReviews"
    }],

    price : {
        type : Number,
        min : 0,
        required : true,
    },

    thumbnail : {
        type : String,
        required : true
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },

    tags : [{
        type : String,
        required : true
    }],

    students : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],

    status : {
        type : String,
        enum : ["Draft", "Waiting For Approval", "Published"],
        default : "Draft"
    }

})


courseSchema.pre("remove", async function(next) {
    try
    {
        await Promise.all(this.students.map(async (student) => await User.findByIdAndUpdate(student, {$pull : {courses : this._id}})))
        await Promise.all(this.courseContent.map(async (section) => await Section.findByIdAndRemove(section)))
        next();
    } catch(e)
    {
        throw new Error(e.message);
    }
})

module.exports = mongoose.model("Course", courseSchema);