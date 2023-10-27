const Course = require("../models/course");
const Categories = require("../models/category");
const User = require("../models/users");
const {imageUploader} = require("../utils/uploadImage");


exports.createCourse = async function(req, res)
{
    try
    {
        const {thumbnail} = req.files;
        const {courseName, courseDescription, whatYouWillLearn, price, category, tags} = req.body;
        if(!thumbnail || !courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || tags.length == 0)
        {
            return res.status(400).json({
                success: false,
                message : "All required fields are not there"
            })
        }

        if(price < 0)
        {
            return res.status(400).json({
                success: false,
                message : "Price cannot be negative or zero."
            })
        }

        const user = await User.findById(req.user.id);

        if(!user)
        {
            return res.status(404).json({
                success: false,
                message : "User does not exist!"
            })
        }

        const categoryObj = await Categories.findById(category);

        if(!categoryObj)
        {
            return res.status(400).json({
                success: false,
                message : "Category does not exists!"
            })
        }

        
        const thumbnailImage = await imageUploader(thumbnail.tempFilePath, "/Codehelp/Course/Thumbnail/");

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : req.user.id,
            whatYouWillLearn,
            price,
            thumbnail : thumbnailImage.secure_url,
            category : categoryObj._id,
            tags
        });

        user.courses.push(newCourse._id);
        await user.save();

        categoryObj.courses.push(newCourse._id);
        await categoryObj.save();

        return res.status(200).json({
            success: true,
            data : newCourse,
            message : "Course created Successsfully"
        })
    } catch (e)
    {
        return res.status(500).json({
            success: false,
            error : e.message || 'Error Creating a Course'
        })
    }
}


exports.getAllCourses = async function(req, res)
{
    try
    {
        const allCourses = await Course.find({}, {courseName : true, price : true, thumbnail : true, instructor : true}).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message : "Data for all courses fetched successfully",
            allCourses
        });
    } catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message : "Can't fetch course data",
            error : e.message
        });
    }
}


exports.getCourseDetails = async function(req, res)
{
    try
    {
        const {courseId} = req.body;
        if(!courseId)
        {
            return res.status(400).json({
                success: false,
                message : "Please provide the course id to get details of that particular course."
            })
        }

        const course = await Course.findById(courseId).populate({
            path : "instructor",
            populate : {path : "additionalDetails"}
        }).populate({
            path : "courseContent",
            populate : { path : "subSection"}
        }).populate({
            path : "ratingAndReviews",
            populate : { path : "user"}
        }).populate("category").exec();

        return res.status(200).json({
            success: true,
            message : "Course Details Fetched Successfully.",
            course
        })
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message : "Can't fetch course details",
            error : e.message || "Internal Server Error"
        })
    }
}