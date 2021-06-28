import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContentShared from '../../components/Apps/VNote/VNoteContentShared';

export default function VNotePageShared() {
   
    return (
        <div className="VNotePage">
            <VNoteBar/>
            <VNoteContentShared/>
        </div>
    )
}
