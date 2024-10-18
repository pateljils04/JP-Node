const mongoose=require("mongoose")

const BlogSchema=new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    tags:[String],
    publisheddate:{
        type:Date,
        default:Date.now,
    }
})

const BlogModel=mongoose.model("Blogs",BlogSchema)

module.exports=BlogModel