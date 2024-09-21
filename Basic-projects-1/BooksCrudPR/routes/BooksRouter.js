const express=require("express")
const {AddBooksPost,GetBooks,UpdateBooks,DeleteBooks}=require("../controllers/BooksController")
const bookRouter=express.Router()

bookRouter.get("/allbooks",GetBooks)
bookRouter.post("/addbooks",AddBooksPost)
bookRouter.put("/updateBooks/:id",UpdateBooks)
bookRouter.delete("/deletebooks/:id",DeleteBooks)
module.exports=bookRouter