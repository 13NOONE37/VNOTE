import React, { useContext, useEffect, useRef, useState } from 'react';
import Macy from 'macy';

import EmptyState from 'components/other/EmptyState';
import RestoreArchive from 'components/main/RestoreArchive';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function ArchivePage() {
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

  const handleShowEmpty = () => {
    let state = false;
    notes.map((item) => {
      if (item.isArchive) state = true;
    });
    return state;
  };

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <RestoreArchive notes={notes} setnotes={setnotes} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note
          renderType='archive'
          notesArray={notes}
          setnotesArray={setnotes}
        />
      </span>
      {!handleShowEmpty() && <EmptyState />}
    </div>
  );
}
