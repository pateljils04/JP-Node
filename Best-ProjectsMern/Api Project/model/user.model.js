const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    dob:{
        type:String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
      location:String,
      password:String,
      cfpassword:String
})

const UserModel=mongoose.model("user",UserSchema)

module.exports=UserModel