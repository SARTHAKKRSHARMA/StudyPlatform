const mailSender = require("../utils/mailSender");
exports.contactUsForm = async function(req, res)
{
    try
    {
        const {firstName, lastName, email, message, phoneNumber} = req.body;
        if(!firstName || !lastName || !email || !message || !phoneNumber)
        {
            return res.status(400).json({
                success: false,
                error: 'Please fill all fields'
            })
        }

        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!regex.test(email))
        {
            return res.status(400).json({
                success : false,
                error : "Please enter a valid email address"
            })
        }

        const emailResponse = await mailSender(email, 'Contact Us Form' ,`We got your ${message}`);
        return res.status(200).json({
            success: true,
            message: 'Message Sent Successfully'
        })
    } catch(e)
    {
        console.log("Error, ", e.message);
        return res.status(500).json(
            {
                success : false,
                error : "Internal Server Error"
            }
        )
    }
}