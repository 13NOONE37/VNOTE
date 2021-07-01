import React, { useContext } from 'react';
import CreateNote from 'components/main/CreateNote';
import Note from 'components/main/Note';

import AppContext from 'store/appContext';

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

  return (
    <div className='mainPage'>
      <span className='actionsContainer'>
        <CreateNote />
      </span>
      <span className='itemsGallery'>
        <Note renderType='pinned' notesArray={notes} setnotesArray={setnotes} />
        <Note renderType='other' notesArray={notes} setnotesArray={setnotes} />
      </span>
    </div>
  );
}
