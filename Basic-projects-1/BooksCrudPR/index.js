const express=require("express")
const connection=require("./db")
const bookRouter = require("./routes/BooksRouter")
const dotenv=require("dotenv")
dotenv.config()

const app=express()
app.use(express.json())
app.use("/books",bookRouter)


app.listen(process.env.PORT || 3000,async()=>{
   try {
    await connection
    console.log("Connected to DB")
    console.log(`Server is running on port ${process.env.PORT || 3000}` )
   } catch (error) {
    console.log(err)
   }
})