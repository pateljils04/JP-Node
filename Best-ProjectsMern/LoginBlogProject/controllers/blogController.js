const BlogsModel = require("../model/blogModel")

const GetBlogs=async(req,res)=>{
    try {
       const Blogs= await BlogsModel.find()
        res.status(200).json({Blogs})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const Addposts=async (req,res)=>{
    const {title,author,content,tags,publisheddate}=req.body
    try {
        const blogdata=await BlogsModel.create({title,author,content,tags,publisheddate,userId:req.user._id})
        res.status(200).json({message:"blog post sucessfully",blogdata})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const UpdateBlogs=async(req,res)=>{
    const {blogId}=req.params
    const userid=req.user?._id
    try {   
        const Blogdata=await BlogsModel.findOne({_id:blogId,userId:userid})
        if(!Blogdata || Blogdata==0){
            return res.status(400).json({ message: "Blogs not found" })
        }
        await BlogsModel.findByIdAndUpdate(blogId,{...req.body})
        res.status(200).json({message:"Blogs are update successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const DeletBlogs=async(req,res)=>{
    const {blogId}=req.params
    const userid=req.user?._id

    try {
        const blogdata=await BlogsModel.findOne({_id:blogId,userId:userid})
        if(!blogdata){
            return res.status(400).json({message:"You can't delete this blogs"})
        }
        await BlogsModel.findByIdAndDelete(blogId)
        res.status(200).json({message:"blogs are deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}



// Admi delete part

const DeletBlogsByAdmin=async(req,res)=>{
    try {
        await BlogsModel.deleteMany()
        res.status(200).json({message:"All blogs are deleted by Admin"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const UpdateByAdmin=async(req,res)=>{

   try {
    const updatedata=await BlogsModel.findByIdAndUpdate({_id:req.params.blogId},req.body)
    if(!updatedata){
        return res.status(400).json({message:"Blogs not found"})
    }
    res.status(200).json({message:"Blog update by Admin"})
   } catch (error) {
    res.status(400).json({message:error.message})
   }
}

module.exports={GetBlogs,Addposts,UpdateBlogs,DeletBlogs,UpdateByAdmin,DeletBlogsByAdmin}