const mongoose = require("mongoose");


const tagSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 20,
        trim : true,
        lowercase : true
    },

    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }]
});

module.exports = mongoose.model("Tag", tagSchema);