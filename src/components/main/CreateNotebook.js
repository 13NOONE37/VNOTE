import React from 'react';
import 'css/main/CreateNote.css';

export default function CreateNotebook({ isNewNotebook, setisNewNotebook }) {
  return (
    <button
      className='CreateNote'
      onClick={() => setisNewNotebook(!isNewNotebook)}
    >
      <span>Create new notebook</span>
    </button>
  );
}
