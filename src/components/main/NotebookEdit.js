import React from 'react';
import 'css/main/NotebookEdit.css';

function NotebookEdit({ notebooks, setnotebooks, id }) {
  return (
    <div className='notebookEdit'>
      <span className='topMargin'>
        <span className='pageTitle'>Dobre praktyki JS: Destrukturyzacja</span>
        <span className='pageDate'>25.05.1410</span>
      </span>
      <span className='content linePaper' contentEditable='true'>
        <b>Szczury</b> <br /> Pewnego dnia przybył szczur do wioski i rzekł
        Szczury to koxy.
      </span>
      <span className='bottomMargin'>
        <span className='PageCount'>54</span>
      </span>
    </div>
  );
}

export default NotebookEdit;
