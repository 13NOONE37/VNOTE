import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';
import VNoteContentGroup from '../../components/Apps/VNote/VNoteContentGroup';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';

export default function VNotePageGroup() {
  return (
    <div className='VNotePage'>
      <VNoteBar />
      <VNoteContentGroup />
      {/* we have to pass id that is in url */}
      asdf
    </div>
  );
}
