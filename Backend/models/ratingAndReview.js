const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },

    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true
    },

    rating : {
        type : Number,
        required : true,
        min : 0,
        max : 5
    },

    review : {
        type : String, 
        required : true,
        maxLength : 500
    }
})


module.exports = mongoose.model("RatingAndReviews", ratingAndReviewsSchema);