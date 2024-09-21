const express=require("express")
const {GetProducts,Postproduct,GetHome}=require("../controllers/productController")
const {PostContact,GetContact,GetAbout}=require("../controllers/contactController")
const UserRouter=express.Router()



UserRouter.get("/home",GetHome)
UserRouter.get("/about",GetAbout)
UserRouter.get("/products",GetProducts)
UserRouter.post("/addproduct",Postproduct)
UserRouter.get("/contacts",GetContact)
UserRouter.post("/addcontact",PostContact)


module.exports=UserRouter