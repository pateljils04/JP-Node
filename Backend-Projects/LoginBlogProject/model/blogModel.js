const mongoose=require("mongoose")

const BlogSchema=new mongoose.Schema({
    title:String,
    userId:String,
    author:String,
    content:String,
    tags:[String],
    publisheddate:{
        type:Date,
        default:Date.now,
    }
})

const BlogsModel=mongoose.model("Blogs",BlogSchema)

module.exports=BlogsModel