const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Otp = require("../models/otpModel");
const Profile = require("../models/profile");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
require("dotenv").config();

exports.sendOtp = async function(req, res) 
{
    try
    {
        const {email} = req.body;
        if(!email){
            console.log("email field can't be empty");
            return res.status(403).json({
                success: false,
                message : "email field can't be empty"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!emailRegex.test(email)){
            console.log("Invalid email input");
            return res.status(400).json({
                success: false,
                message : "Only gmail id's allowed"
            })
        }
        
        const userExist = await User.findOne({email});

        if(userExist)
        {
            console.log("User already exists");
            return res.status(401).json({
                success : false,
                message : "User already registered"
            })
        }

        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets : false, specialChars: false });

        while(await Otp.findOne({otp}))
        {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets : false, specialChars: false });
        }
        
        const otpPayload = {email, otp};

        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        return res.status(200).json({
            success : true,
            message : "Otp sent successfully"
        })
    } catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success : false,
            message : e.message
        });
    }
}

exports.signUp = async function(req, res){
    try
    {
        const {accountType, firstName, lastName, email, contactNumber, password, confirmPassword, otp} = req.body;
        if(!firstName || !lastName || !email || !contactNumber || !password || !confirmPassword || !otp )
        {
            return res.status(403).json({
                success : false,
                message : "All fields are required"
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!emailRegex.test(email)){
            console.log("Invalid email input");
            return res.status(400).json({
                success: false,
                message : "Only gmail email id allowed"
            })
        }
        
        if(password != confirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : "Password doesn't match"
            })
        }

        if(await User.findOne({email}))
        {
            return res.status(400).json({
                success : false,
                message : "Email address already in use"
            })
        }


        const recentOtp = await Otp.findOne({email}).sort({createdAt : -1});

        if(!recentOtp)
        {
            return res.status(400).json({
                success : false,
                message : "OTP Not Found"
            });
        }

        if(otp != recentOtp.otp)
        {
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profile = await Profile.create({contactNumber});
        const user = await User.create({firstName, lastName, email, password : hashedPassword, accountType, additionalDetails : profile._id, image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}+${lastName}`});

        return res.status(200).json({
            success : true,
            message : "User Created Successfully",
            data : user
        });

    } catch(e)
    {
        console.log(e.message);
        return res.status(500).json({
            success:false,
            message : "Internal Server Error"
        });
    }
}


exports.logIn = async function(req, res)
{
    try
    {
        const {email, password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!emailRegex.test(email))
        {
            console.log("Invalid email input");
            return res.status(400).json({
                success: false,
                message : "Enter a valid gmail id"
            })
        }

        const user = await User.findOne({email});
        if(!user) 
        {
            return res.status(400).json({
                success : false,
                message : "Following email is not registered with us"
            })
        }



        const check = await bcrypt.compare(password, user.password);


        if(!check)
        {
            return res.status(400).json({
                success : false,
                message : "Incorrect Password"
            });
        }


        const payload = {
            accountType : user.accountType,
            email : user.email,
            id : user._id
        } 


        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn : "2h",
        })


        user.token = token;
        user.password = undefined;
        
        const option  = {
            httpOnly : true, 
            secure : true, 
            expires : Date.now() + 3*24*60*60*60*1000
        }


        return res.cookie("token", token, ).status(200).json({
            success : true,
            data : user,
            message : "User Logged In successfully"
        });

    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : e.message || "Internal Server Error. Login Failure"
        })
    }
}

exports.changePassword = async function(req, res)
{
    try
    {
        
        const email = req.user.email;
        const {oldPassword, newPassword, newConfirmPassword} = req.body;
        console.log(email, " ", oldPassword, " ", newPassword, " ", newConfirmPassword);
        if(!email || !oldPassword || !newPassword || !newConfirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are mandatory"
            });
        }

        if(newPassword != newConfirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : "Password doesn't match"
            });
        }

        const user = await User.findOne({email});
        const check = await bcrypt.compare(oldPassword, user.password);
        if(!check)
        {
            return res.status(401).json({
                success : false,
                message : "Incorrect Password"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        const response = await user.save();

        try
        {
            const mailResponse = await mailSender(email, "Password Changed Successfully", passwordUpdated(user.email, user.firstName));
            console.log("Mail sent successfully");
        } catch(e)
        {
            throw new Error("Error while sending mail");
        }

        res.clearCookie('token', { httpOnly: true, secure: true });     
        return res.status(200).json({
            success : true,
            message : "Password Changed Successfully"
        })
    } catch(e)
    {
        console.log("Error while changing password ", e.message);
        return res.status(500).json({
            success:false,
            message : "Internal Server Error"
        })
    }
}

exports.getUserFromToken = async function(req, res){

    const id = req.user.id;

    if(!id)
    {
        return res.status(401).json({
            success : false,
            message : "Unauthorized Access Denied",
        })
    }

    try
    {
        const user = await User.findById(id);
        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "No such user found"
            })
        }
        user.password = undefined;
        user.token = req.token;
        return res.status(200).json({
            success : true,
            data : user
        })
    } catch(e)
    {
        console.log("error ", e.message);
        return res.status(500).json({
            success : false,
            message : "Server error occured"
        })        
    }
}













