import React, { useContext, useEffect, useRef } from 'react';
import Macy from 'macy';

import EmptyState from 'components/other/EmptyState';
import EmptyTrash from 'components/main/EmptyTrash';
import RestoreTrash from 'components/main/RestoreTrash';
import Note from 'components/main/Note';
import AppContext from 'store/appContext';

import 'css/other/defaultPage.css';

export default function TrashPage() {
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

  //when we create this function move it to file and import in every page
  useEffect(() => {
    // const macyInstance = new Macy({
    //   container: '.itemsGallery',
    //   mobileFirst: true,
    // });
  }, []);

  return (
    <div className='mainPage scrollClass'>
      <span className='actionsContainer'>
        <RestoreTrash notes={notes} setnotes={setnotes} />
        <EmptyTrash notes={notes} setnotes={setnotes} />
      </span>
      <span ref={itemsGallery} className='itemsGallery'>
        <Note
          renderType='deleted'
          notesArray={notes}
          setnotesArray={setnotes}
        />
      </span>
      {!itemsGallery.current ||
        (itemsGallery.current.children.length == 0 && <EmptyState />)}
    </div>
  );
}
