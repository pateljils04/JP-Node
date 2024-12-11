const express=require("express")
const UserRouter=express.Router()

const Auth=require("../middleware/auth")
const Rolechecker=require("../middleware/roleValidator")
const { RegisterController,UserLogin,GetUser, UserLogout, GetAllUser, UpdateUserByAdmin, DeleteByAdmin } = require("../controllers/user.controller")


UserRouter.get("/getalluser",GetAllUser)
UserRouter.post("/signup",RegisterController)
UserRouter.post("/signin",UserLogin)
UserRouter.get("/logout",UserLogout)
UserRouter.get("/getdata",Auth,GetUser)

//For Admin only
UserRouter.patch("/update/:userId",Auth,Rolechecker,UpdateUserByAdmin)
UserRouter.delete("/delete/:userId",Auth,Rolechecker,DeleteByAdmin)

module.exports=UserRouter