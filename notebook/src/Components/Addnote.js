import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

export const Addnote = (props) => {
  const {showAlert}=props;
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setnote] = useState({
    
    title: "",
    description: "",
    tag: "",
  });
  const handleAdd = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    showAlert("Note added successfully", "success");
    setnote({
        
        title: "",
        description: "",
        tag: "",
      });
  };

  const changed = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3 notesCSS">
        <h3 className="my-1">Add a note</h3>
        <div >
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                onChange={changed}
                minLength={3}
                value={note.title}
                placeholder="Title"
                style={{height:"3.4rem", width:"35rem"}}

                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control "
                id="description"
                name="description"
                onChange={changed}
                minLength={8}
                value={note.description}
                placeholder="Add your description here"
                style={{height:"14rem", width:"35rem"}}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag (Optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                onChange={changed}
                value={note.tag}
                style={{width:"20rem", height:"3.5rem"}}
                
              />
            </div>
            <button
              disabled={note.title.length < 3 || note.description.length < 8}
              type="button"
              className="btn btn-light"
              onClick={handleAdd}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
