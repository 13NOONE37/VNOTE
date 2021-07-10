import React, { useContext, useEffect, useRef, useState } from 'react';
import Macy from 'macy';

import EmptyState from 'components/other/EmptyState';
import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function SharePage() {
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

  const itemsGallery = useRef(null);

  const [isEmpty, setisEmpty] = useState(1);
  useEffect(() => {
    setisEmpty(isEmpty + 1);
  }, [notes]);

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNote />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note renderType='shared' notesArray={notes} setnotesArray={setnotes} />
      </span>
      {isEmpty &&
        itemsGallery.current &&
        itemsGallery.current.children.length == 0 && <EmptyState />}
    </div>
  );
}
