const express=require("express")
const { Addposts, UpdateBlogs, GetBlogs, DeletBlogs, UpdateByAdmin, DeletBlogsByAdmin} = require("../controllers/blogController")
const auth = require("../middleware/auth")
const Rolevalidator = require("../middleware/rolevalidtor")
const BlogRouter=express.Router()
// BlogRouter.use(auth)

BlogRouter.get("/getallblogs",GetBlogs)
BlogRouter.post("/createblog",auth,Addposts)
BlogRouter.put("/updateblog/:blogId",auth,UpdateBlogs)
BlogRouter.delete("/delete/:blogId",auth,DeletBlogs)

// Admin delete blogs
BlogRouter.delete("/Admindelete",auth,Rolevalidator,DeletBlogsByAdmin)
BlogRouter.patch("/updatebyAdmin/:blogId",auth,Rolevalidator,UpdateByAdmin)


module.exports=BlogRouter