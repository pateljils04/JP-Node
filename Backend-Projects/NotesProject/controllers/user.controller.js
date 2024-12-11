const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const otpGenerator = require('otp-generator');
const sendEmail = require("../utlis/sentotp");
const ejs = require("ejs")

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    const verificationToken = jwt.sign({ name, email, password, otpG: otp }, process.env.privateKey)
    console.log(otp, verificationToken)
    try {
        const htmltemplate = await ejs.renderFile(__dirname + "/../views/email.ejs", { otp, name })
        await sendEmail(email, htmltemplate);
        res.cookie("verification_Token", verificationToken).status(200).json({ message: "email sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const verifyController = (req, res) => {
    const { otp } = req.body;
    const verificationtoken = req?.cookies?.verification_Token
    var { name, email, password, otpG } = jwt.verify(verificationtoken, process.env.privateKey)
    if (otpG != otp) {
        return res.status(400).json({ message: "invalid otp" })
    }
    else {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: error.message })
            }
            else {
                await userModel.create({ name, email, password: hash });
                res.status(200).json({ message: "User Created Successfully" });
            }
        })
    }
}


const LoginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
            return res.status(400).json({ message: "error in compare" })
        } else {
            const access_Token = jwt.sign({ email }, process.env.accessKey);
            res.cookie("access_Token", access_Token).status(200).json({ message: "User Login sucessfully" })
        }
    })
}



module.exports = { RegisterUser, verifyController, LoginController }