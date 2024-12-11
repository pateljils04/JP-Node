const userModel = require("../models/userModel");
const Notesmodel = require("../models/notesModel");

const CreateNotes = async (req, res) => {
    const { title, body } = req.body;
    try {
        await Notesmodel.create({ title, body, userId: req.user._id })
        res.status(200).json({ message: "Notes created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const DeleteNotes = async (req, res) => {
    const { notesId } = req.params
    const userId = req.user?._id
    try {
        const notedata = await Notesmodel.findOne({ _id: notesId, userId })
        if (!notedata) {
            res.status(400).json({ message: "notes not found" })
        }
        await Notesmodel.findByIdAndDelete(notesId)
        res.status(200).json({ message: "notes deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getNotes=async(req,res)=>{
    const {_id}=req.user
    try {
        const notesdata=await Notesmodel.find({userId:_id})
        if(!notesdata ){
        res.status(400).json({ message: "notes not found"})
        }
        res.status(200).json({message:notesdata})
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const UpdateNotes=async(req,res)=>{
    const { notesId } = req.params
    const userId = req.user?._id
    try {
        const notedata = await Notesmodel.findOne({ _id: notesId, userId })
        if (!notedata || notedata==0) {
            return res.status(400).json({ message: "notes not found" })
        }
        await Notesmodel.findByIdAndUpdate(notesId,{...req.body})
        res.status(200).json({ message: "notes Update successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const DeleteNotesByAdmin = async (req, res) => {
    try { 
        await Notesmodel.deleteMany()
        res.status(200).json({ message: "Notes are deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const GetAllNotesByAdmin= async(req,res)=>{
    try {
        const allnotes=await Notesmodel.find()
        if(!allnotes || allnotes==0){
            return res.status(400).json({ message: "notes not found" })
        }
        res.status(200).json({ message: "All Notes Get successfully",allnotes })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { CreateNotes, DeleteNotes,UpdateNotes, DeleteNotesByAdmin,getNotes,GetAllNotesByAdmin };