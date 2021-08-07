import React, { useContext, useEffect, useRef, useState } from 'react';
import Macy from 'macy';

import EmptyState from 'components/other/EmptyState';
import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';
import Loading from 'components/other/Loading';

export default function MainPage() {
  const [
    loggedIn,
    user,
    notes,
    setnotes,
    notebooks,
    setnotebooks,
    categoriesTable,
    setcategoriesTable,
  ] = useContext(AppContext);

  const [isNewNote, setisNewNote] = useState(false);
  const itemsGallery = useRef(null);

  const handleShowEmpty = () => {
    let state = false;
    notes.map((item) => {
      if (!item.isArchive && !item.isDeleted && !item.isShared) state = true;
    });
    return state;
  };

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNote isNewNote={isNewNote} setisNewNote={setisNewNote} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        {notes && (
          <Note
            renderType='pinned'
            notesArray={notes}
            setnotesArray={setnotes}
          />
        )}
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        {notes && (
          <Note
            renderType='other'
            notesArray={notes}
            setnotesArray={setnotes}
            isNewNote={isNewNote}
            setisNewNote={setisNewNote}
          />
        )}
      </span>
      {/* <span ref={itemsGallery} className='itemsGallery'>
        {notes && (
          <Note
            renderType='pinned'
            notesArray={notes}
            setnotesArray={setnotes}
          />
        )}
        {notes && (
          <Note
            renderType='other'
            notesArray={notes}
            setnotesArray={setnotes}
            isNewNote={isNewNote}
            setisNewNote={setisNewNote}
          />
        )}
      </span> */}
      {!handleShowEmpty() && <EmptyState />}
    </div>
  );
}
