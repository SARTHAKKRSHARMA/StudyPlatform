const User = require("../models/users");
const Profile = require("../models/profile");
const Course = require("../models/course");
const CourseProgress = require("../models/courseProgress")
const {imageUploader, contentDestroyer} = require("../utils/uploadImage");
const Section = require("../models/section")
const { default: mongoose } = require("mongoose");

exports.updateProfile = async function(req, res)
{
    try
    {   
        const userId = req.user.id;
        const {gender=null, dateOfBirth=null, about=null} = req.body;

        if(!userId)
        {
            return res.status(401).json({
                success : false,
                error: "You must be logged in to update your profile"
            })
        }

        if(!gender && !dateOfBirth && !about)
        {
            return res.status(400).json({
                success : false,
                error: "Please provide atleast one input"
            })
        };

        const user = await User.findById(userId).populate("additionalDetails").exec();
        if(!user)
        {
            return res.status(404).json({
                success : false,
                error: "User not found"
            })
        };

        user.additionalDetails.gender = gender;
        user.additionalDetails.dateOfBirth = dateOfBirth
        user.additionalDetails.about = about

        await user.additionalDetails.save();

        return res.status(200).json({
            success : true,
            message: "Updated successfully",
            user
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : e.message || "Internal Server Error"
        })
    }
}


exports.getAllUserDetails = async function(req, res)
{
    try
    {
        const id = req.user.id;
        if(!id)
        {
            return res.status(400).json({
                success : false,
                error: "Invalid request"
            })
        }

        const user = await User.findById(id).populate("additionalDetails").exec();


        return res.status(200).json({
            success : true,
            data : user,
            message : "User Details fetched successfully"
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error : e.message || "Internal Server Error"
        })
    }
}


// If user is a instructor, His course needs to be deleted too
exports.deleteAccount = async function(req, res)
{
    try
    {
        const userId = req.user.id;
        if(!userId)
        {
            return res.status(400).json({
                success : false,
                error: "Invalid request"
            })
        }

        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(404).json({
                success : false,
                error: "User not found"
            })
        }

        await user.remove();

        return res.status(200).json({
            success : true,
            message: "Deleted Successfully"
        });
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : e.message || "Internal Server Error"
        })
    }
}


exports.getEnrolledCourses = async function(req, res) 
{
    try
    {
        const userId = req.user.id;
        if (!userId)
        {
            return res.status(401).json({
                success : false,
                error : 'Unauthorized'
            })
        }

        const enrolledCourses = await User.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(req.user.id),
              },
            },
            {
              $lookup: {
                from: Course.collection.name,
                localField: "courses",
                foreignField: "_id",
                as: "courseList",
              },
            },
            {
              $unwind: "$courseList",
            },
            {
              $lookup: {
                from: Section.collection.name,
                localField: "courseList.courseContent",
                foreignField: "_id",
                as: "courseSection",
              },
            },
            {
              $unwind: {
                path: "$courseSection",
              },
            },
            {
              $lookup: {
                from: CourseProgress.collection.name,
                localField: "courseList._id",
                foreignField: "course",
                as: "courseProgress",
              },
            },
            {
              $unwind: {
                path: "$courseProgress",
              },
            },
            {
              $group: {
                _id: "$courseList._id",
                courseName: { $first: "$courseList.courseName" },
                courseThumbnail: { $first: "$courseList.thumbnail" },
                courseDescription: { $first: "$courseList.courseDescription" },
                completedVideos: { $first: { $size: "$courseProgress.completedVideos" } },
                uniqueVideos: { $addToSet: "$courseSection.subSection" },
                firstSection : {$first : "$courseSection"}
              },
            },
            {
              $unwind: "$uniqueVideos",
            },
            {
              $unwind: "$uniqueVideos",
            },
            {
              $group: {
                _id: "$_id",
                courseName: { $first: "$courseName" },
                courseThumbnail: { $first: "$courseThumbnail" },
                courseDescription: { $first: "$courseDescription" },
                completedVideos: { $first: "$completedVideos" },
                firstSection : {$first : "$firstSection"},
                totalVideos: { $sum: 1 },
              },
            },
          ]).exec();


        if (!enrolledCourses)
        {
            return res.status(404).json({
                success : false,
                error : "No such user exists!"
            })
        }

        return res.status(200).json({
            success : true,
            data : enrolledCourses
        })
    } catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
          })
    }
}

exports.updateDisplayPicture = async function (req, res)
{
    try
    {
        const {displayPicture} = req.files;
        let userId = req.user.Id;
        if(!displayPicture)
        {
            return res.status(400).json({
                success : false,
                error : "Please select an image"
            })
        }

        const user = await User.findOne({email : req.user.email});
        if(!user)
        {
            return res.status(404).json({
                success : false,
                error : "User not found"
            })
        }


        const response = await imageUploader(displayPicture.tempFilePath, "/StudyPlatform/User/DisplayPicture/");
        user.image = response.secure_url;
        if(user.publicId) await contentDestroyer(user.publicId);       

        user.publicId = response.public_id;
        console.log(user)
        // console.log(respons  e);
        await user.save();
        res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: user,
        })
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}

exports.instructorDashboard = async function (req, res) 
{
    try
    {
        const courseDetails = await Course.find({instructor : req.user.id});
        const courseData = courseDetails.map((course) => {
            const totalStudentEnrolled = course.students.length;
            const totalAmountGenerated = course.price * totalStudentEnrolled;
            const courseDataWithStats = {
                _id : course._id,
                courseName  : course.courseName,
                courseDescription : course.courseDescription,
                totalAmountGenerated,
                totalStudentEnrolled,
            }

            return courseDataWithStats;
        })

        return res.status(200).json({
            success : true,
            data : courseData
        })
        
    } catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success : false,
            message : e.message || "Internal Server Error" 
        })
    }
}