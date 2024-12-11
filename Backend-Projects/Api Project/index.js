const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const connection = require("./database")
const UserRouter = require("./routes/user.router")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/user",UserRouter)


app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection
        console.log("DB is Connected")
        console.log(`Server is running on Port ${process.env.PORT || 3000}`)
    } catch (error) {
        console.log(error)
    }
})
