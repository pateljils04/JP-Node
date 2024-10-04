const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const connection = require("./db")
const UserRouter = require("./routes/user.routes")
const MovieRouter = require("./routes/movie.routes")

const app = express()
app.use(express.json())
app.use("/user", UserRouter)
app.use("/movies", MovieRouter)

app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection
        console.log("connected to Db")
        console.log(`server is running on port ${process.env.PORT || 3000}`)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})