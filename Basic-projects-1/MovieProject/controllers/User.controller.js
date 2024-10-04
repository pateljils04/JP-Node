const Usermodel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const Getdata = async (req, res) => {
    try {
        const user = await Usermodel.find()
        res.status(200).json({ userdata: user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const Signup = (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(400).json({ message: error.message })
            }
            const singleuser = new Usermodel({ name, email, password: hash })
            await singleuser.save()
            res.status(200).json({ message: "User signup successfully", user: singleuser })
        });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const isMatch = await Usermodel.findOne({ email })
        const hashpassword = isMatch.password

        bcrypt.compare(password, hashpassword, function (err, result) {
            if (result) {
                const token = jwt.sign({ userdata: isMatch }, "jilszvm")
                res.status(200).json({ message: "Login successfully", user: isMatch, token })
            }
            else {
                res.status(400).json({ message: "Invalid email or password" })
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};


module.exports = { Signup, Getdata, Login };