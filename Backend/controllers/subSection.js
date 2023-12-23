const Section = require("../models/section");
const SubSection = require("../models/subSection");
const Course = require("../models/course")
const CourseProgress = require("../models/courseProgress")
const {imageUploader} = require("../utils/uploadImage");
const {isFileIdentical} = require("../utils/identicalFileCheck");
const {contentDestroyer} = require("../utils/uploadImage");
const { default: mongoose } = require("mongoose");

exports.createSubSection = async function(req, res)
{
    try
    {
        const {lecture} = req.files;
        const {title, description, sectionId, courseId} = req.body;
        console.log(lecture);
        console.log(title);
        console.log(description);
        console.log(sectionId);
        console.log(courseId);
        if(!lecture || !title || !description || !sectionId || !courseId)
        {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const course = await Course.findById(courseId);
        if(!course)
        {
            return res.status(404).json({
                success : false,
                data : "Course Id is not valid"
            })
        }

        if(!course.instructor.equals(req.user.id))
        {
            return res.status(402).json({
                success : false,
                data : "Unauthorized"
            })
        }

        const section = await Section.findById(sectionId);
        if(!section)
        {
            return res.status(404).json({
                success: false,
                message: "No such section found"
            });
        }

        const response = await imageUploader(lecture.tempFilePath, "/StudyPlatform/Course/Content/");
        const subSection = await SubSection.create({title, description, videoUrl : response.secure_url, publicId : response.public_id});
        section.subSection.push(subSection._id);
        await section.save();

        const updatedCouse = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {path : "subSection"}
        }).exec()

        return res.status(200).json({
            success: true,
            message : "Subsection Created Successfully",
            data : updatedCouse
        })
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message : e.message || "Internal Server Error",
        })
    }
}


exports.updateSubSection = async function(req, res)
{
    try
    {
        const {lecture} = req.files;
        const {subSectionId, sectionId, courseId, title, description} = req.body;
        if(!lecture || !title || !description || !sectionId || !courseId)
        {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const course = await Course.findById(courseId);
        if(!course)
        {
            return res.status(404).json({
                success : false,
                data : "Course Id is not valid"
            })
        }

        if(!course.instructor.equals(req.user.id))
        {
            return res.status(402).json({
                success : false,
                data : "Unauthorized"
            })
        }

        const subSection = await SubSection.findById(subSectionId);
        if(!subSection)
        {
            return res.status(404).json({
                success: false,
                message: "No such subsection found"
            });
        }

        const response = await imageUploader(lecture.tempFilePath, "/StudyPlatform/Course/Content/");

        subSection.title = title;
        subSection.description = description;
        subSection.videoUrl = response.secure_url;
        subSection.publicId = response.public_id;

        await subSection.save();

        const updatedCouse = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {path : "subSection"}
        }).exec()

        return res.status(200).json({
            success: true,
            data: updatedCouse,
            message: "Updated Successfully!"
        })
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message: e.message || 'Server Error!'
        })
    }
}


exports.deleteSubSection = async function(req, res)
{
    try
    {
        const {subSectionId, sectionId, courseId} = req.body;
        if(!subSectionId || !sectionId || !courseId)
        {
            return res.status(400).json({
                success: false,
                message : "All the fields are required"
            });
        }

        const course = await Course.findById(courseId);
        if(!course)
        {
            return res.status(404).json({
                success : false,
                data : "Course Id is not valid"
            })
        }

        if(!course.instructor.equals(req.user.id))
        {
            return res.status(402).json({
                success : false,
                data : "Unauthorized"
            })
        }
        const section = await Section.findById(sectionId);
        if(!section)
        {
            return res.status(404).json({
                success: false,
                message : "No such section found"
            })
        }
        
        const subSection = await SubSection.findByIdAndDelete(subSectionId);
        if(!subSection)
        {
            return res.status(404).json({
                success: false,
                message : "No such sub-section found"
            })
        }

        section.subSection.pull(subSectionId);
        await section.save();

        const updatedCouse = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {path : "subSection"}
        }).exec()

        return res.status(200).json({
            success: true,
            message : "Deleted Successfully!",
            data : updatedCouse
        });
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message : e.message || "Internal Server Error",
        })
    }
}

exports.markLectureComplete = async function(req, res)
{
    try
    {
        const userId = req.user.id;
        const uid = new mongoose.Types.ObjectId(userId);
        const {courseId, subSectionId} = req.body;
        const ssid = new mongoose.Types.ObjectId(subSectionId);

        if(!courseId || !subSectionId)
        {
            return res.status(400).json({
                success: false,
                message: "Please provide course and sub-section ids!"
            })
        }

        const course = await Course.findById(courseId).populate({
            path : "courseContent",
            select : "subSection",
            id : false
        });

        let lectureExistInGivenCourse = false;
        course.courseContent.forEach((section) => {
            if(section.subSection.includes(ssid))
            {
                lectureExistInGivenCourse = true;
                return;
            }
        })
        if(!lectureExistInGivenCourse)
        {
            return res.status(402).json({
                success: false,
                message: `Sub Section does not belong to this course`
            })
        }
        if(!course.students.includes(uid))
        {
            return res.status(401).json({
                success: false,
                message: "You are not enrolled in this course!"
            })
        }

        const courseProgress = await CourseProgress.findOne({user : userId, course : courseId});
        if(courseProgress.completedVideos.includes(ssid))
        {
            return res.status(401).json({
                success: false,
                message: "This video has already been completed"
            })
        }
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Video Marked as completed successfully",
            data : courseProgress
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
