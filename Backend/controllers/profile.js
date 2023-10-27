const User = require("../models/users");
const Profile = require("../models/profile");
const {imageUploader, contentDestroyer} = require("../utils/uploadImage");
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
        const usedId = req.user.id;
        if (!usedId)
        {
            return res.status(401).json({
                success : false,
                error : 'Unauthorized'
            })
        }

        const user = await User.findById(userId).populate("coureses");
        if (!user)
        {
            return res.status(404).json({
                success : false,
                error : "No such user exists!"
            })
        }

        return res.status(200).json({
            success : true,
            data : user.courses
        })
    } catch(e)
    {
        return res.status(500).json({
            success: false,
            message: error.message,
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