import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { Addnote } from "./Addnote";
import { useNavigate } from "react-router-dom";
import empty from "./empty2.png";

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { showAlert } = props;
  let nav = useNavigate();
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
     
      getNotes();
    } else {
      nav("/home");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  // const readref = useRef(null);
  const Closeref = useRef(null);

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleAdd = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note updated successfully", "success");
    Closeref.current.click();
  };

  const changed = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };


  const user=localStorage.getItem("name")?localStorage.getItem("name").toUpperCase():"USER"
  return (
    <>
      <h2 className ="welcome" style={{textAlign:"center"}}>{user}'s NOTEBOOK</h2>
      {/* <div className="d-flex flex-row "> */}
      <div className="NotesView">
        <Addnote showAlert={showAlert} />
        <button
          hidden={true}
          ref={ref}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade modal-lg"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          
        >
          <div className="modal-dialog modalCSS">
            <div className="modal-content" >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container my-3">
                  <h3>Add a note</h3>
                  <div className="box">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="etitle"
                          name="etitle"
                          aria-describedby="emailHelp"
                          onChange={changed}
                          value={note.etitle}
                          minLength={3}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="edescription"
                          name="edescription"
                          onChange={changed}
                          value={note.edescription}
                          required
                          style={{ height: "15rem" }}
                          minLength={8}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                          Tag (Optional)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="etag"
                          name="etag"
                          onChange={changed}
                          value={note.etag}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={Closeref}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light btnCSS"
                  disabled={
                    note.etitle.length < 3 || note.edescription.length < 8
                  }
                  onClick={handleAdd}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
       
                  
        <div className="container notesCSS2">
          <div className="row my-1 ">
            <h3>Your notes</h3>
            {/* {notes.length === 0 && " No notes to display"} */}
            {notes.length === 0 && <img src={empty} alt="Notebook"/>}
            {notes.map((note) => {
              return (
                <NoteItem
                  updateNote={updateNote}
                  showAlert={showAlert}
                  key={note._id}
                  note={note}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
