import React, { useContext, useState } from 'react';

import ChangeCover from 'components/modals/ChangeCover';
import AppContext from 'store/appContext';
import ConfirmModal from 'components/modals/ConfirmModal';

export default function NoteTools({ item, redirectToEdit }) {
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
  const [showConfirmModal, setshowConfirmModal] = useState(false);

  const handleRemoveNotebook = () =>
    setnotebooks(notebooks.filter((n) => n.id !== item.id));

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='notebookTools'
    >
      <button
        aria-label='Open notebook'
        className='tooltipParent notebookItem'
        onClick={() => redirectToEdit(item.id)}
      >
        <i className='fas fa-door-open'></i>
        <span className='tooltip'>Open</span>
      </button>

      <button
        aria-label='Change appearance'
        className='tooltipParent notebookItem'
        onClick={() => setshowCoverBox(!showCoverBox)}
      >
        <i className='fas fa-palette'></i>
        <span className='tooltip'>Appearance</span>
        <ChangeCover
          notebooks={notebooks}
          setnotebooks={setnotebooks}
          id={item.id}
          showCoverBox={showCoverBox}
          setshowCoverBox={setshowCoverBox}
        />
      </button>

      <button
        aria-label='Delete Notebook'
        className='tooltipParent notebookItem'
        onClick={() => setshowConfirmModal(!showConfirmModal)}
      >
        <i className='far fa-trash-alt'></i>
        <span className='tooltip'>Delete</span>
        <ConfirmModal
          color={'error'}
          text={`Notebook will be delete permanently.`}
          confirmAction={handleRemoveNotebook}
          showBox={showConfirmModal}
          setshowBox={setshowConfirmModal}
        />
      </button>
    </div>
  );
}
