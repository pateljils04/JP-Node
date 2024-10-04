const mongoose=require("mongoose")

const Userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
})

const Usermodel=mongoose.model("user",Userschema)

module.exports=Usermodel