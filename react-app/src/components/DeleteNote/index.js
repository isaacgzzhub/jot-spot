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
        // Redirect or perform another action after successful deletion
        history.push("/notes"); // Redirect to the notes listing page
        if (onClose) onClose(); // If an onClose function is provided, call it
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
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteNote;
