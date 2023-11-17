import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesThunk } from "../../store/note";
import NoteItem from "../NoteItem";
import "./NotesList.css";

function NotesList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotesThunk());
  }, [dispatch]);

  const notes = useSelector((state) => state.note.notes);

  return (
    <div className="notes-list-container">
      <h2 className="notes-list-title">Your Notes</h2>
      <div>
        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NotesList;
