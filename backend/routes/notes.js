const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetch all the notes of the logged-in user
router.get("/usernotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2: add a new note
router.post("/addnotes", [
    body("title", "Title must have atleast 3 characters").isLength({min:3}),
    body("description", "Description must have atleast 3 characters").isLength({min:3})

],fetchuser, async (req, res) => {
    try {
        const {title, description, tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note=new Note({
          title, description, tag, user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
   
});

//ROUTE 3: updating notes
router.put('/edit/:id', fetchuser, async(req,res)=>{
    const {title, description, tag}=req.body;
    try{
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //finding the note to be updated in the database
    let note=await Note.findById(req.params.id)  //req.params.id is the id of the note that will be passed in the url (:id)

    //if no note with that id exist,
    if(!note){return res.status(404).send("Not found")}

    //if the user who is accessing the note is not the actual owner of the note, 
    if(note.user.toString()!==req.user.id){
       return res.status(401).send("Not allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
    res.json(note);
}catch (error) {
    res.status(500).send("Internal server error");
}
})


//ROUTE 4: Deleting notes
router.delete('/delete/:id', fetchuser, async(req,res)=>{
    try{
    //finding the note to be updated in the database
    let note=await Note.findById(req.params.id)  //req.params.id is the id of the note that will be passed in the url (:id)

    //if no note with that id exist,
    if(!note){return res.status(404).send("Not found")}

    //if the user who is accessing the note is not the actual owner of the note, 
    if(note.user.toString()!==req.user.id){
       return res.status(401).send("Not allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted"});
}catch (error) {
    res.status(500).send("Internal server error");
}
})

module.exports = router;
