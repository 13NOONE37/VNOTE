import React from 'react';
import 'css/actions/Delete.css';

export default function ArchiveNote({ notesArray, setnotesArray, id }) {
  const handleUnfocus = () => document.activeElement.blur();

  const handleArchive = () => {
    setnotesArray(
      notesArray.map((item) => {
        item.id == id && (item.isArchive = !item.isArchive);

        return item;
      }),
    );
    document.activeElement.blur();
  };

  return (
    <div className='modalChild'>
      <button aria-label='Cancel archive' onClick={handleUnfocus}>
        <i className='fas fa-chevron-left'></i>
      </button>
      <button
        aria-label='Archive note'
        style={{ backgroundColor: '#FF8D4D' }}
        onClick={handleArchive}
      >
        <i className='fas fa-archive'></i>
      </button>
    </div>
  );
}
