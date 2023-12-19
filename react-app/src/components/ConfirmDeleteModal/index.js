import React from "react";
import { useModal } from "../../context/Modal";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm }) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className="confirm-delete-modal">
      <p>Do you want to delete this note?</p>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
}

export default ConfirmDeleteModal;
