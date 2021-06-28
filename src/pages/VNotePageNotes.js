import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContentNotes from '../../components/Apps/VNote/VNoteContentNotes';

export default function VNotePageNotes() {
   
    return (
        <div className="VNotePage">
            <VNoteBar/>
            <VNoteContentNotes/>
        </div>
    )
}
