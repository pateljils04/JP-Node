const express=require("express")
const { CreateBlogs,Getblogs, UpdateBlogs, DeleteBlogs } = require("../controllers/blogController")

const BlogRouter=express.Router()
BlogRouter.get("/read",Getblogs)
BlogRouter.post("/create",CreateBlogs)
BlogRouter.put("/update/:blogId",UpdateBlogs)
BlogRouter.delete("/delete/:blogId",DeleteBlogs)



module.exports=BlogRouter