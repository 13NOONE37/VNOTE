import React, { useContext, useEffect, useRef, useState } from 'react';

import EmptyState from 'components/other/EmptyState';
import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function NotesPage() {
  const [isNewNote, setisNewNote] = useState(false);
  const itemsGallery = useRef(null);

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

  useEffect(() => {
    // const parentEl = itemsGallery.current;
    // const childs = parentEl.children;
    // if (window.innerWidth >= 824) {
    //   console.log(childs);
    //   console.log(parentEl.offsetWidth);
    // }
  }, []);

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNote isNewNote={isNewNote} setisNewNote={setisNewNote} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note renderType='pinned' notesArray={notes} setnotesArray={setnotes} />
        <Note
          renderType='other'
          notesArray={notes}
          setnotesArray={setnotes}
          isNewNote={isNewNote}
          setisNewNote={setisNewNote}
        />
      </span>
      {!itemsGallery.current ||
        (itemsGallery.current.children.length == 0 && <EmptyState />)}
    </div>
  );
}
