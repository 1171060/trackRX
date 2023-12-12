import React from "react";

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this record?</p>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
