import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContentArchive from '../../components/Apps/VNote/VNoteContentArchive';

export default function VNotePageDeleted() {
  return (
    <div className='VNotePage'>
      <VNoteBar />
      <VNoteContentArchive />
    </div>
  );
}
