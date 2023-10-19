const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async function(email, title, body)
{
    try
    {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
              user: process.env.MAIL_ID,
              pass: process.env.MAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: 'StudyPlatform - Teacher', // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            html: body, // html body
        })
        console.log(info);
        return info;
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
}

module.exports = mailSender;