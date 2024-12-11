const express=require("express");
const { CreateNotes,DeleteNotes, DeleteNotesByAdmin, UpdateNotes, getNotes, GetAllNotesByAdmin } = require("../controllers/notes.controller");
const Auth = require("../middleware/auth.middleware");
const rolevalider = require("../middleware/roleValidater");
const NotesRouter=express.Router();

NotesRouter.use(Auth)
NotesRouter.post("/create",CreateNotes)
NotesRouter.get("/getallnotes",getNotes)
NotesRouter.delete("/delete/:notesId",DeleteNotes)
NotesRouter.patch("/update/:notesId",UpdateNotes)

// admin
NotesRouter.delete("/deletealluser",rolevalider,DeleteNotesByAdmin)
NotesRouter.get("/getAdminnotes",rolevalider,GetAllNotesByAdmin)


module.exports=NotesRouter