import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchNoteByIdThunk, deleteNoteThunk } from "../../store/note";
import { useModal } from "../../context/Modal";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import "./NoteDetail.css";

function NoteDetail({ noteId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const note = useSelector((state) => state.note.currentNote);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchNoteByIdThunk(noteId));
  }, [dispatch, noteId]);

  const handleDeleteConfirmation = () => {
    setModalContent(<ConfirmDeleteModal onConfirm={() => handleDelete()} />);
  };

  const handleDelete = async () => {
    await dispatch(deleteNoteThunk(noteId));
    // closeModal is called within ConfirmDeleteModal after confirmation
  };

  const handleEdit = () => {
    closeModal(); // Close the modal
    history.push(`/edit-note/${noteId}`); // Then navigate to edit page
  };

  return (
    <div className="note-detail-container">
      <div className="note-detail-header">
        <h1>{note?.title}</h1>
        <div className="delete-icon" onClick={handleDeleteConfirmation}>
          X
        </div>
      </div>
      <p>{note?.content}</p>
      <button onClick={handleEdit}>Edit Note</button>{" "}
      {/* Edit button with updated functionality */}
      {/* Rest of your component */}
    </div>
  );
}

export default NoteDetail;
