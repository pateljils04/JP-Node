const express=require("express")
const UserRouter=express.Router()
const { SignUpcontroller, Login } = require("../controllers/userController")


UserRouter.post("/signup",SignUpcontroller)
UserRouter.post("/signin",Login)

module.exports=UserRouter