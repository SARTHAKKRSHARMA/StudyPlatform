const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: { 
        type: String, 
        required: true,
        maxLength : 100
    },

    subSection : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection",
            required : true
        }
    ]
})


module.exports = mongoose.model("Section", sectionSchema);