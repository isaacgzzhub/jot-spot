import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNoteByIdThunk } from "../../store/note";
import DeleteNote from "../DeleteNote";
import "./NoteDetail.css";

function NoteDetail({ noteId }) {
  const dispatch = useDispatch();
  const note = useSelector((state) => state.note.currentNote);

  useEffect(() => {
    dispatch(fetchNoteByIdThunk(noteId));
  }, [dispatch, noteId]);

  return (
    <div className="note-detail-container">
      <h1>{note?.title}</h1>
      <p>{note?.content}</p>
      {/* You might want to adjust how the edit and delete actions are handled */}
      <DeleteNote noteId={noteId} />
    </div>
  );
}

export default NoteDetail;
