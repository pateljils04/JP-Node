const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Auth=(req,res,next)=>{
    const Access_Token = req.cookies.access_Token;
    if (!Access_Token) {
        res.status(400).json({ error: "Please Login To Create A Note" })
    }
    jwt.verify(Access_Token, process.env.accessKey, async function (err, decoded) {
        if (err) {
            res.status(400).json({ error: "Invalid Token" })
        }
        else {
            const {email}=decoded
            const user=await userModel.findOne({email})
            req.user=user
            next()
        }
    })
}

module.exports=Auth;