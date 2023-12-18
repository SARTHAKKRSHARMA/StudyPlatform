const { default: mongoose } = require("mongoose");
const Course = require("../models/course");
const RatingAndReviews = require("../models/ratingAndReview");


exports.createReview = async function(req, res)
{
    try
    {
        const userId = req.user.id;
        const {courseId, rating, review} = req.body;

        if(!userId)
        {
            return res.status(401).json({
                success: false,
                error: "User not logged in"
            })
        }

        if(!courseId || !rating || !review)
        {
            return res.status(400).json({
                success : false,
                message : "Required parameter not present"
            });
        }

        if(rating <= 0 && rating > 5)
        {
            return res.status(401).json({
                success: false,
                error: "Rating should be between 1 and 5"
            });
        }

        const course = await Course.findById(courseId).populate("ratingAndReviews", "user").exec();

        if (!course)
        {
            return res.status(404).json({
                success : false,
                message : "Course does not exist."
            });
        }

        if(!course.students.includes(userId))
        {
            return res.status(401).json({
                success: false,
                error: "You are not a student of this course."
            })
        }

        const reviewPresent = course.ratingAndReviews.includes(userId)
        if (reviewPresent){
            return res.status(400).json({
                success : false,
                message : "Already rated for the same course."
            })
        }

        const ratingAndReview = await RatingAndReviews.create({user : userId, rating, review});
        course.ratingAndReviews.push(ratingAndReview._id);
        await course.save();

        return res.status(200).json({
            success : true,
            data : ratingAndReview,
            message : "Review created successfully!"
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error : e.message || "Internal Server Error",
            message : "Failed to create review"
        })
    }   
}


exports.getAverageRating = async function(req, res)
{
    try
    {
        const {courseId} = req.body;
        if(!courseId)
        {
            return res.status(400).json({
                success : false,
                error : "Please provide a valid course id.",
            })
        }

    
        const averageRating = await Course.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(courseId), // Match the specific course by _id
              },
            },
            {
              $lookup: {
                from: RatingAndReviews.collection.name, // The name of the collection to populate from
                localField: "ratingAndReviews", // Field from the "Course" model
                foreignField: "_id", // Field in the "ratingAndReviews" collection
                as: "ratingAndReviewsData",
              },
            },
            {
              $unwind: "$ratingAndReviewsData", // Unwind the array if it's an array
            },
            {
              $group: {
                _id: new mongoose.Types.ObjectId(courseId),
                averageValue: { $avg: "$ratingAndReviewsData.rating" },
                },
            },
        ]);


        let averageValue = 0;       
        if (averageRating.length > 0) {
            averageValue = averageRating[0].averageValue;
        }

        return res.status(200).json({
            success : true,
            averageRating : averageValue
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error : e.message || 'Error occurred while fetching average rating.'
        })
    }
}


exports.getAllRating = async function(req, res)
{
    try
    {
        const course = await Course.find().select("courseName").populate({
            path: 'ratingAndReviews',
            populate : {
                        path : "user",
                        select : "firstName lastName email image"
                    },
        }).sort({'ratingAndReviews.rating' : 'desc'}).exec();
        

        return res.status(200).json({
            success : true,
            message : "Reviews fetched Successfully",
            reviews : course
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error : e.message || 'Error occurred while fetching reviews.'
        })
    }
}

exports.getAllRatingForACourse = async function(req, res)
{
    try
    {
        const {courseId} = req.body;
        if(!courseId)
        {
            return res.status(400).json({
                success : false,
                error : "Please provide a valid course id.",
            })
        }

        const course = await Course.findById(courseId).populate({
            path: 'ratingAndReviews',
            populate : "user"
        }).exec();

        return res.status(200).json({
            success : true,
            message : "Reviews fetched Successfully",
            reviews : course.ratingAndReviews
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error : e.message || 'Error occurred while fetching reviews.'
        })
    }
}
