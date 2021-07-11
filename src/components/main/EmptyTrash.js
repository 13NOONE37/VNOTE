import React, { useState } from 'react';
import 'css/main/CreateNote.css';
import ConfirmModal from 'components/modals/ConfirmModal';

export default function EmptyTrash({ notes, setnotes }) {
  const handleEmptyTrash = () => {
    setnotes(notes.filter((item) => item.isDeleted != true));
  };

  const [showBox, setshowBox] = useState(false);

  return (
    <button
      className='CreateNote actionButton'
      onClick={() => setshowBox(!showBox)}
    >
      <ConfirmModal
        color={'error'}
        text={`All notes in the trash will be permanently deleted.`}
        confirmAction={handleEmptyTrash}
        showBox={showBox}
        setshowBox={setshowBox}
      />
      <span>Empty Trash</span>
      <span>
        <i className='fas fa-eraser'></i>
      </span>
    </button>
  );
}
