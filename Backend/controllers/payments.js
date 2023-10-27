const instance = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/users");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail")
const mongoose = require("mongoose");

exports.createOrder = async function(req, res)
{
    try 
    {
        const userId = req.user.id;
        const {courseId} = req.body;
        if(!userId)
        {
            return res.status(401).json({
                status: false,
                message: "User not logged in"
            });
        }
        
        if(!courseId)
        {
            return res.status(400).json({
                status: false,
                message: "Invalid request parameters"
            });
        }

        const course = await Course.findById(courseId);
        if (!course)
        {
            return res.status(404).json({
                status: false,
                message: "Course does not exist."
            })
        }

        const user = await User.findOne({_id : new mongoose.Types.ObjectId(userId), $inc : {courses : course._id}});
        if(user)
        {
            return res.status(400).json({
                status: false,
                message: "You have already enrolled this course!"
            })
        }
        
        const order = await new instance.orders.create({
            amount : course.price * 100,
            currency : 'INR',
            recipt :  (Math.random() * Date.now()).toString(),
            notes : {
                courseId : courseId,
                userId
            } 
        })

        return res.status(200).json({
            status: true,
            data: order,
            message: "Successfully created Order",
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumnail : course.thumbnail,
            orderId : order.id,
            price : course.price
        })
    } catch(e)
    {
        return res.status(500).json({
            status: false,
            message: e.message || "Internal Server Error"
        })
    }
}


exports.verifySignature = async function(req, res)
{
    try
    {
        const wekhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];
        const shaSum = crypto.createHmac("sha256", wekhookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest('hex');

        if(digest === signature)
        {
            const {courseId, userId} = req.body.payload.payment.entity.notes;
            try
            {
                const updatedCourse = await Course.findByIdAndUpdate(courseId, {$push : {students : userId}}, {new : true});
                if(!updatedCourse)
                {
                    return res.status(500).json({
                        status: false,
                        message: "Error in updating Course Status"
                    })
                }
                const updatedUser = await User.findByIdAndUpdate(userId, {$push : {courses : courseId}}, {new : true});
                if(!updatedUser)
                {
                    return res.status(500).json({
                        status: false,
                        message: "Error in updating Student Status"
                    })
                }

                const emailResponse = await mailSender(updatedUser.email, 'Payment Successful' ,`Congratulation, you're onboarded into new Codehelp Course`);
                return res.status(200).send({
                    status: true,
                    message: 'Signature verified and Course Added'
                })

            }   catch(e)
            {
                return res.status(500).json({
                    success : false,
                    error : e.message
                })
            }
        } else
        {
            return res.status(401).json({
                status: false,
                message: "Invalid Signature"
            })
        }

        
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error : e.message || "Internal Server Error"
        })
    }
}