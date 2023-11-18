const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.isNotAuthenticated = async function(req, res, next)
{
    try
    {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        if(!token)
        {
            next();
        }
        else
        {
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return res.status(400).json({
                success: false,
                message: "You are already authenticated. Kindly logout first"
            })
            
        }
    } catch(e)
    {
        next();
    }
}

exports.isAuthenticated = async function(req, res, next) {
    try
    {
        const token = req.cookies.token || req.body.token || req.header["Authorization"].replace("Bearer ", "");
        if(!token)
        {
            return res.status(401).json({
                success : false,
                message: 'Unauthorized. Kindly Login First.'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if(err){
                return res.status(403).json({
                    success : false,
                    message : "Token verification Failed"
                })
            }

            req.user = payload;
            next();
        });

    } catch(e)
    {
        return res.status(500).json({
            success : false,
            error   : e.message,
            message : "Token verification failed."
        });
    }
}


exports.isStudent = async function(req, res, next)
{
    try
    {
        if(!req.user)
        {
            return res.status(401).json({
                success : false,
                message : "Unauthenticated User!"
            })
        }

        if(req.user.accountType !== "Student")
        {
            return res.status(401).json({
                success : false,
                message : "This is a protected route for student"
            })
        }

        next();
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : "User Role can't be verified"
        })
    }
}


exports.isInstructor = async function(req, res, next)
{
    try
    {
        if(!req.user)
        {
            return res.status(401).json({
                success : false,
                message : "Unauthenticated User!"
            })
        }

        if(req.user.accountType !== "Instructor")
        {
            return res.status(401).json({
                success : false,
                message : "This is a protected route for instructor"
            })
        }

        next();
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : "User Role can't be verified"
        })
    }
}




exports.isAdmin = async function(req, res, next)
{
    try
    {
        if(!req.user)
        {
            return res.status(401).json({
                success : false,
                message : "Unauthenticated User!"
            })
        }

        if(req.user.accountType !== "Admin")
        {
            return res.status(401).json({
                success : false,
                message : "This is a protected route for admin"
            })
        }

        next();
    } catch(e)
    {
        return res.status(500).json({
            success : false,
            message : "User Role can't be verified"
        })
    }
}