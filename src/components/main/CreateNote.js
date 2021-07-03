import React from 'react';
import 'css/main/CreateNote.css';

export default function CreateNote({ isNewNote, setisNewNote }) {
  return (
    <button className='CreateNote' onClick={() => setisNewNote(!isNewNote)}>
      <span>Create new...</span>
      <span>
        <i className='fas fa-check-square'></i>
        <i className='fas fa-brush'></i>
        <i className='fas fa-image'></i>
      </span>
    </button>
  );
}
