import React from "react";
import { useModal } from "../../context/Modal";
import NoteDetail from "../NoteDetail";
import "./NoteItem.css";

function NoteItem({ note }) {
  const { setModalContent } = useModal();

  const handleClick = () => {
    setModalContent(<NoteDetail noteId={note.id} />);
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
