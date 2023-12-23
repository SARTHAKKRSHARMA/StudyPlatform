const Course = require("../models/course");
const Categories = require("../models/category");
const CourseProgress = require("../models/courseProgress")
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

        const course = await Course.findOne({_id : courseId, status : "Published"}).populate({
            path : "instructor",
            populate : {path : "additionalDetails"},
        }).populate({
            path : "courseContent",
            populate : { 
                path : "subSection",
                select : "title description"
            },
        }).populate({
            path : "ratingAndReviews",
            populate : { path : "user"}
        }).populate("category").exec();

        console.log(course);
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

exports.getCourseDetailsAuthenticated = async function(req, res)
{
    try
    {
        const {courseId} = req.body;
        const userId = req.user.id;
        const uid = new mongoose.Types.ObjectId(userId);
        if(!courseId)
        {
            return res.status(400).json({
                success: false,
                message : "Please provide the course id to get details of that particular course."
            })
        }

        const course = await Course.findOne({_id : courseId, status : "Published"});
        if(!course)
        {
            return res.status(401).json({
                success: false,
                message : "You are not authorized to access this resource or the requested resource does not exist."
            })
        }

        if(!course.students.includes(uid))
        {
            return res.status(402).json({
                success:false,
                message:"You are not enrolled in this course."
            })
        }

        const courseProgress = await CourseProgress.findOne({course : course._id, user : userId});

        const populatedCourse = await Course.findOne({_id : courseId, status : "Published"}).populate({
            path : "instructor",
            populate : {path : "additionalDetails"},
        }).populate({
            path : "courseContent",
            populate : { 
                path : "subSection",
            },
        }).populate({
            path : "ratingAndReviews",
            populate : { path : "user"}
        }).populate("category").exec();

        return res.status(200).json({
            success: true,
            message : "Course Details Fetched Successfully.",
            data : {populatedCourse, courseProgress},
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

        const course = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        });
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
        const category = await Categories.findById(course.category);

        if(!course || !category)
        {
            return res.status(401).json({
                success : false,
                error : "Course Id is not valid"
            })
        }

        if(!course.instructor.equals(req.user.id))
        {
            return res.status(402).json({
                success : false,
                error : "Unauthorized"
            })
        }


        await Course.findByIdAndDelete(courseId);
        category.courses.pull(course._id);
        await category.save();
        const user = await User.findByIdAndUpdate(req.user.id, {$pull : {courses : courseId}}).populate({
            path : "courses",
            populate : {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        }).exec();

        console.log(user.courses);
        return res.status(200).json({
            success : true,
            message : "Course Deleted Successfully",
            data : user.courses
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
        const {id:userId} = req.user;
        console.log(userId);
        const user = await User.findById(userId).populate({
            path : "courses",
            populate : {
                path : "courseContent",
                populate : {path : "subSection"}
            }
        }).exec();
        return res.status(200).json({
            success : true,
            message : "Course Fetched Successfully",
            data : user.courses
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

exports.publishCourse = async function(req, res)
{
    try
    {
        const {courseId} = req.body;
        if(!courseId)
        {
            return res.stats(400).json({
                success:false,
                message:"Please provide the valid information."
            })
        }

        const course = await Course.findById(courseId);
        if(!course)
        {
            return res.status(401).json({
                success : false,
                message : "Invalid Course ID!"
            })
        }

        if(!course.instructor.equals(req.user.id))
        {
            return res.status(402).json({
                success : false,
                message : "You are not authorized to perform this action!"
            })
        }

        course.status = "Published";
        await course.save();
        const updatedCourse = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {path : "subSection"}
        }).exec();

        return res.status(200).json({
            success : true,
            data : updatedCourse,
        })
    } catch(e)
    {
        console.log(e);
        return res.status(500).json({
            succes : false,
            message : e.message || 'Server Error!'
        })
    }
}