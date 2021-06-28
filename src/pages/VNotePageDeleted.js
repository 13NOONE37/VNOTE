import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContentDeleted from '../../components/Apps/VNote/VNoteContentDeleted';

export default function VNotePageDeleted() {
  return (
    <div className='VNotePage'>
      <VNoteBar />
      <VNoteContentDeleted />
    </div>
  );
}
