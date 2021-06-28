import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContent from '../../components/Apps/VNote/VNoteContent';

export default function VNotePage() {
  return (
    <div className='VNotePage'>
      <VNoteBar />
      <VNoteContent />
    </div>
  );
}
