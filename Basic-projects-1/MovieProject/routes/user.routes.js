const express = require("express")
const UserRouter = express.Router()
const { Signup, Getdata, Login } = require("../controllers/User.controller")

UserRouter.get("/userdata", Getdata)
UserRouter.post("/register", Signup)
UserRouter.post("/login", Login)


module.exports = UserRouter