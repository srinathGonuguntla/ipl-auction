import React from 'react';

const DeleteConfirmation = ({ 
  isOpen, 
  onCancel, 
  onConfirm, 
  message 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;