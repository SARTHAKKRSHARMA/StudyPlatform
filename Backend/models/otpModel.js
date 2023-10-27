const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate")

const otpSchema = mongoose.Schema({
    email : {
        type : String, 
        required : true,
        trim : true,
    },

    otp : {
        type : String,
        required : true,
    },

    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60,
    }
})


async function sendVerificationEmail(email, otp)
{
    try
    {
        // console.log(otpTemplate);
        const mailTemplate = otpTemplate(otp);
        const mailResponse = await mailSender(email, "Verification email from Study Platform", mailTemplate);
        console.log("Mail sent successfully ", mailResponse);
    } catch(e)
    {
        console.log("Error occured while sending mail ", e);
        throw e;
    }
} 

otpSchema.pre("save", async function(next) {
    try
    {

       await sendVerificationEmail(this.email, this.otp);
       console.log("here");
       next(); 
    }
    catch(e)
    {
        console.log("Error occured while sending email: ", e);
        throw e;
    }
})

module.exports = mongoose.model("OTP", otpSchema);
