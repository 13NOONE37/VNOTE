import React, { useContext, useEffect, useRef } from 'react';
import Macy from 'macy';

import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

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

  const itemsGallery = useRef(null);

  useEffect(() => {
    // const macyInstance = new Macy({
    //   container: '.itemsGallery',
    //   mobileFirst: true,
    // });
  }, []);

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <CreateNote />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note renderType='pinned' notesArray={notes} setnotesArray={setnotes} />
        <Note renderType='other' notesArray={notes} setnotesArray={setnotes} />
      </span>
    </div>
  );
}
