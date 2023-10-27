const { default: mongoose } = require("mongoose");
const Category = require("../models/category");
const Course = require("../models/course");
const RatingAndReview = require("../models/ratingAndReview");

exports.createCategory = async function(req, res)
{
    try
    {
        const {name, description} = req.body;
        if(!name || !description)
        {
            return res.status(400).json({
                success: false,
                message : "Please provide name and descrition of category"
            });
        }

        const category = await Category.create({name, description});
        return res.status(200).json({
            success: true,
            message : "Category created successfully",
            data : category
        });
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message : "Internal Server Error"
        })
    }
}


exports.getAllCategories = async function(req, res)
{
    try
    {
        const categories = await Category.find({}, {name : true, description : true});
        return res.status(200).json({
            success: true,
            message : "Successfully fetched all the categories",
            categories
        });
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message : "Internal Server Error"
        });
    }
}


exports.categoriesPageDetails = async function(req, res)
{
    try
    {
        const {categoryId} = req.body;
        if(!categoryId)
        {
            return res.status(400).json({
                success: false,
                message : "Invalid request"
            })
        }


        const allCourses = await Category.findById(categoryId).populate("courses").exec();

        if(!allCourses)
        {
            return res.status(404).json({
                success : false,
                message : "Category not found."
            })
        }

        const differentCategoryTopSellingCourse = await Category.aggregate([
            {
                $match : {
                    _id : {$ne : new mongoose.Types.ObjectId(categoryId)}
                }
            },

            {
                $lookup:{
                    from : Course.collection.name,
                    localField : "courses",
                    foreignField : "_id",
                    as : "courseList"
                }
            },
            {
                $unwind : "$courseList"
            },
            {
                $group : {
                    _id : "$_id",
                    topSelling : {$max : {$size : "$courseList.students"}}
                }
            },
            {
                $sort : {topSelling : -1}
            }
        ]).exec();

        const mostSelling = await Category.aggregate([
            {
                $match:{_id : new mongoose.Types.ObjectId(categoryId)}  // filter by category id
            },
            {
                $lookup : {
                    from : Course.collection.name,
                    localField : "courses",
                    foreignField : "_id",
                    as : "courseList"
                }
            },
            {
                $unwind : "$courseList"
            },
            {
                $group : {
                    _id : "$courseList._id",
                    studentsEnrolled : {$sum : {$size : '$courseList.students'}}
                }
            },
            {
                $sort : {studentEnrolled : -1}
            },
            // {
            //     $lookup : {
            //         from : Course.collection.name,
            //         localField : "_id",
            //         foreignField : "_id",
            //         as : "CourseDetails"
            //     }
            // },
            // {
            //     $unwind : "$CourseDetails"
            // },
        ]).exec()

        const topRated = await Category.aggregate([
            {
                $match:{_id : new mongoose.Types.ObjectId(categoryId)}  // filter by category id
            },
            {
                $lookup : {
                    from : Course.collection.name,
                    localField : "courses",
                    foreignField : "_id",
                    as : "courseList"
                },
            },
            {
                $unwind : "$courseList"
            },
            {
                $lookup : {
                    from : RatingAndReview.collection.name,
                    localField : "courseList.ratingAndReviews",
                    foreignField : "_id",
                    as : "ratingAndReviews"
                }
            },
            {
                $unwind : "$ratingAndReviews"
            },
            {
                $group : {
                    _id : "$courseList._id",
                    averageRating : {$avg : '$ratingAndReviews.rating'}
                }
            },
            {
                $sort : {averageRating : -1}
            },

        ]).exec();


        return res.status(200).json({
            success: true,
            topRated,
            mostSelling,
            differentCategoryTopSellingCourse,
            allCourses,
            message : "Courses fetched successfully"
        })
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            error : e.message || "Internal Server Error"
        })
    }
}