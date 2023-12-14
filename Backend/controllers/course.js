const Course = require("../models/course");
const Categories = require("../models/category");
const User = require("../models/users");
const {imageUploader} = require("../utils/uploadImage");
const { default: mongoose } = require("mongoose");


exports.createCourse = async function(req, res)
{
    try
    {
        const {thumbnail} = req.files;
        const {courseName, courseDescription, whatYouWillLearn, price, category, tags, requirements, benefits} = req.body;
        if(!thumbnail || !courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || tags.length == 0 || !requirements )
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

        const tagsArray = JSON.parse(tags);
        const requirementsArray = JSON.parse(requirements);
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : req.user.id,
            whatYouWillLearn,
            price,
            thumbnail : thumbnailImage.secure_url,
            category : categoryObj._id,
            tags : tagsArray,
            requirements : requirementsArray,
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
        console.log(e);
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

exports.editCourse = async function(req, res)
{
    try
    {
        const {thumbnail} = req.files;
        const {courseId, courseName, courseDescription, whatYouWillLearn, price, category, tags} = req.body;
        if(!courseId || !thumbnail || !courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags)
        {
            return res.status(401).json({
                success : false,
                error : "Required Field Not Provided"
            })
        }

        if(price < 0)
        {
            return res.status(400).json({
                success: false,
                error : "Price cannot be negative or zero."
            })
        }

        const course = await Course.findById(courseId);
        if(!course)
        {
            return res.status(401).json({
                success : false,
                error : "Course Id is not valid"
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


        if(!course.instructor.equals(req.user.id))
        {
            return res.status(402).json({
                success : false,
                error : "Unauthorized"
            })
        }

        
        
        const thumbnailImage = await imageUploader(thumbnail.tempFilePath, "/Codehelp/Course/Thumbnail/");

        course.courseName = courseName;
        course.courseDescription = courseDescription;
        course.whatYouWillLearn = whatYouWillLearn;
        course.price = price;
        course.thumbnail = thumbnailImage.secure_url
        course.category = category
        course.tags = tags;
        await course.save();

        return res.status(200).json({
            success : true,
            message : "Course Updated Successfully",
            data : course
        })
    } catch(e)
    {
        console.log("Faced error while editing course Details");
        return res.status(500).json({
            success : false,
            message : "Error occured while updating course data",
            data : e.message || "Internal Server Error"
        })   
    }
    
}

exports.deleteCourse = async function(req, res)
{
    try
    {
        const {courseId} = req.body;
        if(!courseId)
        {
            return res.status(401).json({
                success : false,
                error : "Course Id Not Provided"
            })
        }

        
        const course = await Course.findById(courseId);
        if(!course)
        {
            return res.status(401).json({
                success : false,
                error : "Course Id is not valid"
            })
        }

        if(course.instructor !== req.user.id)
        {
            return res.status(402).json({
                success : false,
                error : "Unauthorized"
            })
        }


        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success : true,
            message : "Course Deleted Successfully",
        })
    } catch(e)
    {
        console.log("Faced error while deleting course Details");
        return res.status(500).json({
            success : false,
            message : "Error occured while deleting course data",
            data : e.message || "Internal Server Error"
        })   
    }
}

exports.getInstructorCourses = async function(req, res) 
{
    try
    {
        const {userId} = req.user;
        const course = await User.findById(userId).populate("courses").exec();
        return res.status(200).json({
            success : true,
            message : "Course Fetched Successfully",
            data : course.courses
        })
    } catch(e)
    {
        console.log("Error occured while fetching courses");
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching course",
            error : e.message || "Internal Server Error"
        })
    }
}