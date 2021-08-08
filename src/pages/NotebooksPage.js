import React, { useContext, useEffect, useRef, useState } from 'react';

import EmptyState from 'components/other/EmptyState';
import CreateNotebook from 'components/main/CreateNotebook';
import Notebook from 'components/main/Notebook';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function NotesPage() {
  const [isNewNotebook, setisNewNotebook] = useState(false);
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

  const handleShowEmpty = () => {
    return notebooks.length;
  };

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNotebook
          isNewNotebook={isNewNotebook}
          setisNewNotebook={setisNewNotebook}
        />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Notebook
          notebooks={notebooks}
          setnotebooks={setnotebooks}
          isNewNotebook={isNewNotebook}
          setisNewNotebook={setisNewNotebook}
        />
      </span>
      {!handleShowEmpty() && <EmptyState />}
    </div>
  );
}
