import React from "react";
import { useDispatch } from "react-redux";
import { deleteNoteThunk } from "../../store/note";
import { useHistory } from "react-router-dom";

function DeleteNote({ noteId, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteNoteThunk(noteId))
      .then(() => {
        history.push("/notes");
        if (onClose) onClose();
      })
      .catch((err) => {
        console.error("Failed to delete the note:", err);
      });
  };

  return (
    <div>
      <h3>Are you sure you want to delete this note?</h3>
      <div>
        <button onClick={handleDelete}>Yes, Delete</button>
      </div>
    </div>
  );
}

export default DeleteNote;
