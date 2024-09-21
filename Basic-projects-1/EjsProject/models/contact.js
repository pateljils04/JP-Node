const mongoose=require("mongoose")

const ContactSchema=new mongoose.Schema({
    name:String,
    email:String,
    message:String
})

const ContactModel=mongoose.model("contact",ContactSchema)


module.exports=ContactModel