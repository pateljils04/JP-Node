const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const connection = require("./db")
const BlogRouter = require("./routes/BlogRoutes")
const { json } = require("body-parser")

const app = express()
app.use(json())
app.use("/blogs",BlogRouter)

app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection
        console.log("connect to the DB")
        console.log(`server is running on the ${process.env.PORT || 3000} PORT`)
    } catch (error) {
        console.log(error)
    }
})