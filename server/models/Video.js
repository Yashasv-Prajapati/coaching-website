const mongoose = require("mongoose")

const videoSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        teacher:{
            type:String,
            required:true
        },
        Date : {type: Date},
        JEE: { 
            type: Boolean,
            required: true,
        },
        NEET: { 
            type: Boolean,
            required: true,
        },
        subject : {
            type: String,
            required: true
        },
        chapter: {
            type: Number,
            //required: true
        },
        category: {
            type: Number,
            enum: [1,2,3,4,5],
            required: true,
        },
        lecture: {
            type: String,
            required: true
        },
        pic: {
            type: "String",
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        vidurl: {
            type: String,
            required : true
        },
        courseName: {
            type: String,
            required: true
        }
    },
    { timestaps: true }
)


const Video = mongoose.model("videos", videoSchema)

module.exports = Video