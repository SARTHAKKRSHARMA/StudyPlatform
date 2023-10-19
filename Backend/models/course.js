const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String, 
        trim : true,
        maxLength : 200,
        required : true
    },

    courseDescription : {
        type : String, 
        trime : true,
        maxLength : 1500,
        required : true
    },

    instructor : {
        type : mongoose.Schema.Types.ObjectId,
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

    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag",
        required : true
    }],

    students : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }]

})

module.exports = mongoose.model("Course", courseSchema);