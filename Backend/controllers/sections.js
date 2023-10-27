const Course = require("../models/course");
const Section = require("../models/section");
const SubSection = require("../models/subSection");

exports.createSection = async function(req, res)
{
    try
    {
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                error: "You must provide a section name and course Id",
                success : false
            })
        }

        const course = await Course.findById(courseId);
        if (!course)
        {
            return res.status(404).json({
                success : false,
                error : "Course not found"
            });
        }

        const section = await Section.create({sectionName});
        course.courseContent.push(section._id);
        await course.save();

        const populatedCourse = await Course.findById(courseId).populate(
            {
                path : "courseContent",
                populate : {path : "subSection"}
            }).exec();

        return res.status(200).json({
            success : true,
            message : "Section Created Successfully",
            data : populatedCourse
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : "Unable to create section, please try again",
            error : e.message || "Internal Server Error"
        })
    }
}

exports.updateSection = async function(req, res)
{
    try
    {
        const {sectionId, sectionName} = req.body;
        if(!sectionId || !sectionName)
        {
            return res.status(400).json({
                error : "Please provide all required fields",
                success : false
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new : true});
        return res.status(200).json({
            success : true,
            message : "Section Updated Successfully",
            data : updatedSection
        })
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message  : "Failed to update section",
            error : e.message || "Internal Server Error"
        })
    }
}


exports.deleteSection = async function(req, res)
{
    try
    {
        const {sectionId} = req.body;
        const {courseId} = req.body;
        if(!courseId || !sectionId)
        {
            return res.status(400).json({
                error : "Please provide course and section id",
                success : false
            })
        }

        const section = await Section.findById(sectionId);
        await section.deleteOne();

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {$pull : {"courseContent" : sectionId}}, {new : true});

        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully and all subsection related with it",
            data : updatedCourse
        })
    } catch (e)
    {
        return res.status(500).json({
            success : false,
            message  : "Failed to delete section",
            error : e.message || "Internal Server Error"
        })
    }
}