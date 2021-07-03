import React from 'react';
import 'css/main/CreateNote.css';

export default function EmptyTrash({ notes, setnotes }) {
  const handleEmptyTrash = () => {
    setnotes(notes.filter((item) => item.isDeleted != true));
  };
  return (
    <button
      className='CreateNote actionButton'
      onClick={() => handleEmptyTrash()}
    >
      <span>Empty Trash</span>
      <span>
        <i className='fas fa-eraser'></i>
      </span>
    </button>
  );
}
