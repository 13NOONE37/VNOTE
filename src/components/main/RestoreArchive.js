import React from 'react';
import 'css/main/CreateNote.css';

export default function RestoreArchive({ notes, setnotes }) {
  const handleRestoreArchive = () => {
    setnotes(
      notes.map((item) => {
        item.isArchive && (item.isArchive = false);
        return item;
      }),
    );
  };

  return (
    <button
      className='CreateNote actionButton'
      onClick={() => handleRestoreArchive()}
    >
      <span>Restore Archive</span>
      <span>
        <i className='fas fa-undo'></i>
      </span>
    </button>
  );
}
