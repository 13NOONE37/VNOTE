import React, { useContext, useState } from 'react';

// import handleToggleCryptState from 'utils/NoteActions/handleToogleCryptState';

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
      className='noteTools'
    >
      <button
        aria-label='Change Cover'
        className='tooltipParent noteItem'
        onClick={() => setshowCoverBox(!showCoverBox)}
      >
        <i className='fas fa-share'></i>
        <span className='tooltip'>Change Cover</span>
        <ChangeCover
          notesArray={notes}
          id={item.id}
          showCoverBox={showCoverBox}
          setshowCoverBox={setshowCoverBox}
        />
      </button>
    </div>
  );
}
