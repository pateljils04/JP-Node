const bcrypt=require("bcrypt");
const UserModel = require("../model/userModel");
var cookieParser = require('cookie-parser')
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()



const SignUpcontroller=(req,res)=>{
    const {username,email,password}=req.body
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.status(400).json({message:error.message})
            }
            const singleuser=await UserModel.create({username,email,password:hash})
            res.status(200).json({message:"User created successfully",singleuser})
        });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        const hashpassword = user.password

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        bcrypt.compare(password, hashpassword, function (err, result) {
            if (result) {
                const Access_Token = jwt.sign({ email },process.env.Token_key )
                res.cookie("AccessToken",Access_Token).status(200).json({ message: "Login successfully", user })
            }
            else {
                res.status(400).json({ message: "Invalid email or password" })
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};


module.exports={SignUpcontroller,Login}