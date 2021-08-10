import React, { useContext, useState } from 'react';

import ChangeCover from 'components/modals/ChangeCover';
import AppContext from 'store/appContext';

export default function NoteTools({ item }) {
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
  const [showCoverBox, setshowCoverBox] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='notebookTools'
    >
      <button aria-label='Open notebook' className='tooltipParent notebookItem'>
        <i class='fas fa-door-open'></i>
        <span className='tooltip'>Open notebook</span>
      </button>

      <button
        aria-label='Change appearance'
        className='tooltipParent notebookItem'
        onClick={() => setshowCoverBox(!showCoverBox)}
      >
        <i className='fas fa-palette'></i>
        <span className='tooltip'>Change appearance</span>
        <ChangeCover
          notebooks={notebooks}
          setnotebooks={setnotebooks}
          id={item.id}
          showCoverBox={showCoverBox}
          setshowCoverBox={setshowCoverBox}
        />
      </button>
    </div>
  );
}
