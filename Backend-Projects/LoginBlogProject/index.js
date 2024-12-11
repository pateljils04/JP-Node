const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db");
const cookieParser = require('cookie-parser')
const UserRouter = require("./routes/userRoutes");
const BlogRouter = require("./routes/blogRoutes");
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use("/user",UserRouter)
app.use("/blogs",BlogRouter)

app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection
        console.log("DB is Connected")
        console.log(`Server is running on ${process.env.PORT || 3000} Port`)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})