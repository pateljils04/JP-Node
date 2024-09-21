const mongoose=require("mongoose")

const booksSchema= new mongoose.Schema({
    title:String,
    author:String,
    price:Number,
    description:String,
    isbn:String
})

const bookModel=mongoose.model("books",booksSchema)

module.exports=bookModel