import React from 'react';
import 'css/main/CreateNote.css';

export default function RestoreTrash({ notes, setnotes }) {
  const handleRestoreTrash = () => {
    setnotes(
      notes.map((item) => {
        item.isDeleted && (item.isDeleted = false);
        return item;
      }),
    );
  };

  return (
    <button
      className='CreateNote actionButton'
      onClick={() => handleRestoreTrash()}
    >
      <span>Restore Trash</span>
      <span>
        <i className='fas fa-undo'></i>
      </span>
    </button>
  );
}
