import React, { useContext, useEffect, useRef, useState } from 'react';

import EmptyState from 'components/other/EmptyState';
import CreateNote from 'components/main/CreateNote';
import Notebook from 'components/main/Notebook';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function NotebooksPage() {
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

  const handleShowEmpty = () => {
    return notebooks.length;
  };

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNote isNewNote={isNewNote} setisNewNote={setisNewNote} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Notebook
          renderType='pinned'
          notesArray={notes}
          setnotesArray={setnotes}
        />
      </span>
      {!handleShowEmpty() && <EmptyState />}
    </div>
  );
}
