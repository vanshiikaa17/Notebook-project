import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

export const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updateNote, showAlert } = props;
  // const date=note.date;
  // const d=date.getDate();
  return (
    <div className="col-md-12">
      <div className="card my-3 mx-2">
        <span
          hidden={true && note.tag.length === 0}
          className="position-absolute top-0 start-95 translate-middle badge rounded-pill bg-warning"
        >
          {note.tag}
        </span>
        <div className="card-body cardtext d-flex flex-row justify-content-between cardtext">
          <div>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
              {note.description.length > 60
                ? note.description.slice(0, 60) + "..."
                : note.description}
            </p>
          </div>
          <div className="d-flex flex-column">
            <i
              className="fa-solid fa-trash-can my-2 trash"
              onClick={() => {
                deletenote(note._id);
                showAlert("Note deleted successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen my-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            {/* <i className="fa-solid fa-book-open-reader"></i> */}
            {/* <div>{date}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
