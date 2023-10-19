const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender : {
        type : String
    },

    dateOfBirth : {
        type : String
    },

    about : {
        type : String,
        trim : true
    },

    contactNumber : {
        type : Number,
        trim : true,
        match : /^[6789]\d{9}$/
    }
})


module.exports = mongoose.model("Profile", profileSchema);