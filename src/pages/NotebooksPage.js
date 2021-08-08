import React, { useContext, useEffect, useRef, useState } from 'react';

import EmptyState from 'components/other/EmptyState';
import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function NotesPage() {
  const [isNewNote, setisNewNote] = useState(false);
  const itemsGallery = useRef(null);
  const renderType = 'other';

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

  const [isEmpty, setisEmpty] = useState(1);
  useEffect(() => {
    setisEmpty(isEmpty + 1);
  }, [notes]);

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
        <Note renderType='pinned' notesArray={notes} setnotesArray={setnotes} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note
          renderType={renderType}
          notesArray={notes}
          setnotesArray={setnotes}
          isNewNote={isNewNote}
          setisNewNote={setisNewNote}
        />
      </span>
      notebooks page
      {!handleShowEmpty() && <EmptyState />}
    </div>
  );
}
