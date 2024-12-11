const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const userRouter = require("./routes/userRoutes")
const connection = require("./db")
const cookieParser = require('cookie-parser')
const NotesRouter = require("./routes/notesRoutes")

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter)
app.use("/notes",NotesRouter)



app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection
        console.log("Connected To The DB")
        console.log(`Server is running on Port ${process.env.PORT || 3000}`)
    } catch (error) {
        console.log(error)
    }
})
