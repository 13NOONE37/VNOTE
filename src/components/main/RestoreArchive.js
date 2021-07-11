import React, { useState } from 'react';
import 'css/main/CreateNote.css';
import ConfirmModal from 'components/modals/ConfirmModal';

export default function RestoreArchive({ notes, setnotes }) {
  const handleRestoreArchive = () => {
    setnotes(
      notes.map((item) => {
        item.isArchive && (item.isArchive = false);
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
        text={`All notes in the archive will be restored to they previous positions.`}
        confirmAction={handleRestoreArchive}
        showBox={showBox}
        setshowBox={setshowBox}
      />
      <span>Restore Archive</span>
      <span>
        <i className='fas fa-undo'></i>
      </span>
    </button>
  );
}
