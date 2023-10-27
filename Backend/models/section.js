const mongoose = require("mongoose");
const SubSection = require("./subSection");

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
            // required : true
        }
    ]
})

sectionSchema.pre("deleteOne", async function(next) {
    console.log("here");
    try
    {
        await Promise.all(this.subSection.map(async (sub) => await SubSection.findByIdAndRemove(sub)));
        next();
    } catch(e)
    {
        throw new Error(e.message);
    }
})


module.exports = mongoose.model("Section", sectionSchema);