const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const UserModel = require("../model/userModel")

const auth = (req, res, next) => {
    const Access_token = req?.cookies?.AccessToken
    if (!Access_token) {
        return res.status(400).json({ message: "Please Login To Create a Blogs" })
    }
    jwt.verify(Access_token, process.env.Token_key, async function (err, decoded) {
        if (err) {
            res.status(400).json({ message: "you not access the blogs" })
        } else {
            const { email } = decoded
            const user = await UserModel.findOne({ email })
            // console.log(user)
            req.user = user
            next()
        }
    });
}

module.exports = auth