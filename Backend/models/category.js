const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 20,
        trim : true,
        lowercase : true, 
        unique : true
    },

    description : {
        type : String,
        required : true,
        maxLength : 250,
        trim : true,
    },

    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
});

module.exports = mongoose.model("Category", categorySchema);