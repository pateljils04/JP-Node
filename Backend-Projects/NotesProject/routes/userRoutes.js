const express=require("express")
const userRouter=express.Router()
const {RegisterUser, verifyController, LoginController}=require("../controllers/user.controller")


userRouter.post("/register",RegisterUser)

userRouter.post("/verify",verifyController)

userRouter.post("/login",LoginController)




module.exports=userRouter