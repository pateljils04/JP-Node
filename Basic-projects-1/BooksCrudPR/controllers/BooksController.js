const express=require("express")
const bookModel = require("../models/BooksModel")


const GetBooks=async(req,res)=>{
    try {
         const book= await bookModel.find()
        // console.log(book)
        res.status(200).json({books:book})

    } catch (error) {
        res.status(400).json({message:"Data not find "})
    }
}

const AddBooksPost=async(req,res)=>{
    const{title,author,price,description,isbn}=req.body
    try {
        const singlebook = new bookModel({title,author,price,description,isbn})
        await singlebook.save()
        res.status(200).json({message:"Books Add successfully"})
        
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const UpdateBooks=async(req,res)=>{
    const {id}=req.params
    try {
        await bookModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Data updated successfully"})
    } catch (error) {
        res.status(404).json({message:error})
    }
}

const DeleteBooks=async(req,res)=>{
    const {id} = req.params

    try {
        await bookModel.findByIdAndDelete(id)
        res.status(200).json({message:"Book are deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error})
        
    }

}
module.exports={AddBooksPost,GetBooks,UpdateBooks,DeleteBooks}