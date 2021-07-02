import React from 'react';
import 'css/actions/Delete.css';
import handleUnfocus from 'utils/Global/handleUnfocus';

export default function PreDelete({
  setnotesArray,
  notesArray,
  id,
  showRestoreIcon,
}) {
  const handlePreDelete = () => {
    setnotesArray(
      notesArray.map((item) => {
        item.id == id && (item.isDeleted = !item.isDeleted);

        return item;
      }),
    );
    document.activeElement.blur();
  };

  return (
    <div className='modalChild'>
      <button aria-label='Cancel delete' onClick={handleUnfocus}>
        <i className='fas fa-chevron-left'></i>
      </button>

      <button aria-label='Delete note' onClick={handlePreDelete}>
        {showRestoreIcon ? (
          <i className='fas fa-undo'></i>
        ) : (
          <i className='far fa-trash-alt'></i>
        )}
      </button>
    </div>
  );
}
