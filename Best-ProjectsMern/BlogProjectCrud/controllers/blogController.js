const BlogModel = require("../model/blogmodel")


const Getblogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find()
        res.status(200).json({ blogs })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const CreateBlogs = async (req, res) => {
    const { title, author, content, tags, publisheddate } = req.body
    try {
        const blogData = await BlogModel.create({ title, author, content, tags, publisheddate })
        res.status(200).json({ message: "Blogs are add successfully", blogData })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const UpdateBlogs = async (req, res) => {
    try {
        await BlogModel.findByIdAndUpdate(req.params.blogId, req.body)
        res.status(200).json({ message: "Blog are updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const DeleteBlogs = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.params.blogId)
        res.status(200).json({ message: "Blog delete successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = { CreateBlogs, Getblogs, UpdateBlogs, DeleteBlogs }