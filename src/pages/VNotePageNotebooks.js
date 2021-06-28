import React from 'react';
import '../../css/Apps/VNote/VNotePage.css';

import VNoteBar from '../../components/Apps/VNote/VNoteBar';
import VNoteContentNotebooks from '../../components/Apps/VNote/VNoteContentNotebooks';

export default function VNotePageNotebooks() {
   
    return (
        <div className="VNotePage">
            <VNoteBar/>
            <VNoteContentNotebooks/>
        </div>
    )
}
