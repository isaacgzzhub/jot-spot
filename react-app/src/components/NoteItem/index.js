import React from "react";
import { useHistory } from "react-router-dom";
import "./NoteItem.css";

function NoteItem({ note }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/notes/${note.id}`); // Navigate to the detail view of the note
  };

  return (
    <div className="note-item" onClick={handleClick}>
      <h3 className="note-item-title">{note.title}</h3>
      <p className="note-item-content">
        {note.content.slice(0, 100)}
        {note.content.length > 100 ? "..." : ""}
      </p>
    </div>
  );
}

export default NoteItem;
