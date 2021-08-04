import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Macy from 'macy';

import EmptyState from 'components/other/EmptyState';
import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function CategoryPage() {
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
  const { id } = useParams();
  const [isNewNote, setisNewNote] = useState(false);
  const itemsGallery = useRef(null);

  const [isEmpty, setisEmpty] = useState(1);
  useEffect(() => {
    setisEmpty(isEmpty + 1);
  }, [notes]);

  const handleShowEmpty = () => {
    let state = false;
    notes.map((item) => {
      if (item.groups.includes(id) && !item.isDeleted && !item.isArchive)
        state = true;
    });
    return state;
  };

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNote isNewNote={isNewNote} setisNewNote={setisNewNote} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note
          categoryTypeHere={id}
          renderType='category'
          notesArray={notes}
          setnotesArray={setnotes}
          isNewNote={isNewNote}
          setisNewNote={setisNewNote}
        />
      </span>
      {!handleShowEmpty() && <EmptyState />}
    </div>
  );
}
