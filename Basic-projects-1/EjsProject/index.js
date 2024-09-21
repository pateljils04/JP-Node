const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const connection=require("./db")
const UserRouter = require("./routes/userRouter")

const app=express()
app.use(express.json())
app.use(UserRouter)

app.set('view engine','ejs')

// app.get("/home",(req,res)=>{
//     res.render("home")
// })
// app.get("/about",(req,res)=>{
//     res.render("about")
// })




app.listen(process.env.PORT || 3000,async()=>{
    try {
        await connection
        console.log("Connected To DB")
        console.log(`Server is running on Port ${process.env.PORT || 3000}`) 
    } catch (error) {
        console.log(error)
    }

})