import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchNoteByIdThunk } from "../../store/note";
import DeleteNote from "../DeleteNote";
import "./NoteDetail.css";

function NoteDetail() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const note = useSelector((state) => state.note.currentNote);

  useEffect(() => {
    dispatch(fetchNoteByIdThunk(noteId));
  }, [dispatch, noteId]);

  const handleEdit = () => {
    history.push(`/edit-note/${noteId}`);
  };

  return (
    <div className="note-detail-container">
      <h1>{note?.title}</h1>
      <p>{note?.content}</p>
      <button onClick={handleEdit}>Edit Note</button>
      <DeleteNote noteId={noteId} />
    </div>
  );
}

export default NoteDetail;
