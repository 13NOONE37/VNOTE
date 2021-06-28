import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContentSecrets from '../../components/Apps/VNote/VNoteContentSecrets';

export default function VNotePageSecrets() {
   
    return (
        <div className="VNotePage">
            <VNoteBar/>
            <VNoteContentSecrets/>
        </div>
    )
}
