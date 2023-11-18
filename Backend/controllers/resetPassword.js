const User = require("../models/users");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async function(req, res)
{
    try
    {
        const {email} = req.body;

        if (!email)
        {
            return res.status(401).json({
                success : false,
                message: "Email is required"
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!emailRegex.test(email)){
            console.log("Invalid email input");
            return res.status(400).json({
                success: false,
                message : "Only gmail email id allowed"
            });
        }

        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success : false,
                message : "Following email id is not registered with us"
            });
        }

        const token = crypto.randomUUID();
        user.resetPasswordtoken = token;
        user.resetPasswordExpires = Date.now() + 5*60*1000;
        await user.save();
        const url = `http://localhost:3000/update-password/${token}`
        await mailSender(email, "Reset Password", `To Reset Password <a href=${url}>Click Here<a/>`);
        return res.status(200).json({
            success : true,
            message : "Email Sent Successfully"
        })

    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : e.message
        });
    }
}

exports.resetPassword = async function(req, res)
{
    try
    {
        const {password, confirmPassword, token} = req.body;
        
        if(!token || !password || !confirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : "All required fields are not present"
            });
        }

        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : "Password do not match"
            });
        }
        
        const user = await User.findOne({resetPasswordtoken : token});
        
        if(!user)
        {
            return res.status(400).json({
                success : false,
                message : "Token is invalid",
                token
            })
        }

        if(Date.now() >= user.resetPasswordExpires)
        {
            return res.status(400).json({
                success : false,
                message : "Token is expired. Kindly generate a new one"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordtoken = null;
        user.resetPasswordExpires = null;
        await user.save();
    
        await mailSender(user.email, "Password Reset Successful", `Dear ${user.firstName},

        We are writing to inform you that your password has been successfully reset.
        
        Your security is important to us, and we take password resets very seriously. If you did not initiate this password reset, please contact our support team immediately at same mail address to report any suspicious activity on your account.
        
        If you did initiate the password reset, you can now log in to your account with your new password. Please make sure to keep your password safe and do not share it with anyone.`);


        return res.status(200).json({
            success : true,
            message : "Password Updated Successfully",
            email : user.email
        })
    } catch(e)
    {
        console.log(e.message);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}