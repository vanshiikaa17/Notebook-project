import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  

  const [notes, setnotes] = useState(notesInitial);

   //fetching notes
   const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/usernotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token'),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setnotes(json);
  };

  //Add note

  const addnote=async(title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        
      });
      const note=await response.json();
     
      setnotes(notes.concat(note));
  }

  //delete note
  const deletenote=async (id)=>{
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE",
  
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem('token'),

        },
      });
      const json = await response.json();
      console.log(json);
    console.log(id + " deleted");
    const newNotes=notes.filter((note)=>{
        return note._id!==id;
    })
    setnotes(newNotes);
  }

  //editing note
  const editNote=async(id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/edit/${id}`, {
        method: "PUT",
  
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem('token'),

        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let i = 0; i < newNotes.length; i++) {
        if (newNotes[i]._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setnotes(newNotes);

  }
  return (
    <NoteContext.Provider value={{ notes, setnotes, addnote, deletenote, getNotes, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
