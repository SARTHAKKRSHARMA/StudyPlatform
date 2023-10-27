const Section = require("../models/section");
const SubSection = require("../models/subSection");
const {imageUploader} = require("../utils/uploadImage");
const {isFileIdentical} = require("../utils/identicalFileCheck");
const {contentDestroyer} = require("../utils/uploadImage");

exports.createSubSection = async function(req, res)
{
    try
    {
        const {lecture} = req.files;
        const {title, description, timeDuration, sectionId} = req.body;
        if(!lecture || !title || !description || !timeDuration || !sectionId)
        {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
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
        const subSection = await SubSection.create({title, timeDuration, description, videoUrl : response.secure_url, publicId : response.public_id});
        section.subSection.push(subSection._id);
        await section.save();

        const populatedSection = await section.populate("subSection");
        return res.status(200).json({
            success: true,
            message : "Subsection Created Successfully",
            data : populatedSection
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
        const {subSectionId, title, timeDuration, description} = req.body;
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection)
        {
            return res.status(404).json({
                success: false,
                message: "No such subsection found"
            });
        }


        if(!lecture)
        {
            Object.assign(subSection, {title, timeDuration, description});
        }
        else
        {
            console.log("here");
        
            await contentDestroyer(subSection.publicId);
            const response = await imageUploader(lecture.tempFilePath, "/StudyPlatform/Course/Content/");
            Object.assign(subSection, {title, timeDuration, description, videoUrl : response.secure_url, publicId : response.publicId});
        }

        await subSection.save();

        return res.status(200).json({
            success: true,
            data: subSection,
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
        const {subSectionId, sectionId} = req.body;
        if(!subSectionId || !sectionId)
        {
            return res.status(400).json({
                success: false,
                message : "All the fields are required"
            });
        }

        const section = await Section.findById(sectionId);
        if(!section)
        {
            return res.status(404).json({
                success: false,
                message : "No such section found"
            })
        }
        
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection)
        {
            return res.status(404).json({
                success: false,
                message : "No such sub-section found"
            })
        }

        await subSection.remove();
        section.subSection.pull(subSectionId);
        await section.save();

        return res.status(200).json({
            success: true,
            message : "Deleted Successfully!",
            data : section
        });
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message : e.message || "Internal Server Error",
        })
    }
}
