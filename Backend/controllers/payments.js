const instance = require("../config/razorpay");
const Course = require("../models/course");
const CourseProgress = require("../models/courseProgress");
const User = require("../models/users");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail")
const mongoose = require("mongoose");
const Razorpay = require("razorpay")
const crypto = require("crypto")

require("dotenv").config();

exports.capturePayment = async function (req, res)
{
    const {courses} = req.body;

    const userId = req.user.id;
    const uid = new mongoose.Types.ObjectId(userId);

    if(!courses || courses.length === 0)
    {
        return res.status(400).json({
            success: false,
            message: "No Courses Provided"
        })
    }
    
    const user = await User.findById(userId);

    let totalAmount = 0;
    for(const course_id of courses) 
    {
        console.log("course id is", course_id);
        let course;
        try
        {
            course = await Course.findById(course_id);
            if(course.students.includes(uid))
            {
                return res.status(401).json({
                    success: false,
                    message: `User is already enrolled in this course.`
                })
            }
            totalAmount += course.price
        } catch (e)
        {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }

    try
    {
        var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
        const order = await new instance.orders.create({
            amount : totalAmount * 100,
            currency : 'INR',
            receipt :  (Math.random(Date.now())).toString(),
        })


        return res.status(200).json({
            success: true,
            data: order,
            message: "Successfully created Order",
            orderId : order.id,
            courses : courses,
            totalAmount,
            key : process.env.RAZORPAY_KEY
    })
    } 
    catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message : "Error occured while creating order"
        })
    }
}

exports.verifyPayment = async function (req, res)
{
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const courses = req.body.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId)
    {
        return res.status(400).json({
            success : false ,
            message : "Please provide all the required fields"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
    if(razorpay_signature === expectedSignature)
    {

        const response = await enrollStudents(courses, userId, res);
        
        if(response.success)
        {
            return res.status(200).json({
                success : true ,
                message : "Payment is verified",
                user : response.user
            })
        }
        
    }

    return res.status(200).json({
        success : false ,
        message : "Payment Failed"
    })
}


const enrollStudents = async(courses, userId, res) => {
    if(!courses || !userId)
    {
        return res.status(400).json({
            success : false ,
            message : "Invalid data provided"
        })
    }

    const user = await User.findById(userId);

    if(!user)
    {
        return res.status(404).json({
            success : false ,
            message : "User not found"
        })
    }

    for(const course_id of courses)
    {
        const course = await Course.findByIdAndUpdate(course_id, {$push : {students : user._id}}, {new : true});
        const courseProgress = await CourseProgress.create({course : course._id, user : user._id});
        if(!course) 
        {
            return res.status(500).json({
                success:false,
                message:"Course with given id doesnot exist."
            })
        }
        user.courses.push(course._id);
        user.courseProgress.push(courseProgress._id);

    }

    await user.save();
    const emailResponse = await mailSender(user.email, 'Payment Successful' ,`Congratulation, you're onboarded into new Codehelp Course`);
    return {
        success : true,
        user
    }
}

// exports.createOrder = async function(req, res)
// {
//     try 
//     {
//         const userId = req.user.id;
//         const {courseId} = req.body;
//         if(!userId)
//         {
//             return res.status(401).json({
//                 status: false,
//                 message: "User not logged in"
//             });
//         }
        
//         if(!courseId)
//         {
//             return res.status(400).json({
//                 status: false,
//                 message: "Invalid request parameters"
//             });
//         }

//         const course = await Course.findById(courseId);
//         if (!course)
//         {
//             return res.status(404).json({
//                 status: false,
//                 message: "Course does not exist."
//             })
//         }

//         const user = await User.findOne({_id : new mongoose.Types.ObjectId(userId), $inc : {courses : course._id}});
//         if(user)
//         {
//             return res.status(400).json({
//                 status: false,
//                 message: "You have already enrolled this course!"
//             })
//         }
        
//         const order = await new instance.orders.create({
//             amount : course.price * 100,
//             currency : 'INR',
//             recipt :  (Math.random() * Date.now()).toString(),
//             notes : {
//                 courseId : courseId,
//                 userId
//             } 
//         })

//         return res.status(200).json({
//             status: true,
//             data: order,
//             message: "Successfully created Order",
//             courseName : course.courseName,
//             courseDescription : course.courseDescription,
//             thumnail : course.thumbnail,
//             orderId : order.id,
//             price : course.price
//         })
//     } catch(e)
//     {
//         return res.status(500).json({
//             status: false,
//             message: e.message || "Internal Server Error"
//         })
//     }
// }


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
            const {courses, userId} = req.body.payload.payment.entity.notes;
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