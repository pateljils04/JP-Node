const ContactModel = require("../models/contact")


const GetAbout = (req, res) => {
    res.render("about")
}

const GetContact = async (req, res) => {
    try {
        const Contact = await ContactModel.find()
        // res.status(200).json({message:"All Contact data",Contact})
        res.render("contact",{Contact})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const PostContact = async (req, res) => {
    const { name, email, message } = req.body

    try {
        await ContactModel.create({ name, email, message })
        res.status(200).json({ message: "All Contact data added successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { PostContact, GetContact, GetAbout }