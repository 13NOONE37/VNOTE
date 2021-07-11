import React, { useState } from 'react';
import 'css/main/CreateNote.css';
import ConfirmModal from 'components/modals/ConfirmModal';

export default function RestoreTrash({ notes, setnotes }) {
  const handleRestoreTrash = () => {
    setnotes(
      notes.map((item) => {
        item.isDeleted && (item.isDeleted = false);
        return item;
      }),
    );
  };
  const [showBox, setshowBox] = useState(false);

  return (
    <button
      className='CreateNote actionButton'
      onClick={() => setshowBox(!showBox)}
    >
      <ConfirmModal
        color={'positive'}
        text={`All notes in the trash will be restored to they previous positions.`}
        confirmAction={handleRestoreTrash}
        showBox={showBox}
        setshowBox={setshowBox}
      />
      <span>Restore Trash</span>
      <span>
        <i className='fas fa-undo'></i>
      </span>
    </button>
  );
}
