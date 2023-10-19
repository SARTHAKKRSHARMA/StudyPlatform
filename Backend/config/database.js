const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async function()
{
    try
    {
        const connection = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })

        console.log("Connected to DB successfully");
    } catch(e)
    {
        console.log("Got an error while connecting to DB");
        console.error(e.message);
        process.exit(1);
    }
}


module.exports = dbConnect;