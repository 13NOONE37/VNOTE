import React, { useContext, useState } from 'react';

import encryptNote from 'utils/NoteActions/encryptNote';
import ChangeColor from 'utils/NoteActions/ChangeColor';
import addCheckboxes from 'utils/NoteActions/addCheckboxes';
import LinkToCategories from 'components/modals/LinkToCategories';
import Share from 'components/modals/ShareNote';
import ArchiveNote from 'utils/NoteActions/ArchiveNote';
import PreDelete from 'utils/NoteActions/preDelete';
import Delete from 'utils/NoteActions/Delete';

import AppContext from 'store/appContext';

export default function NoteTools({
  item,
  showEditedNote,
  setshowEditedNote,
  setidShowEditedNote,
}) {
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

  const [showLinkCategories, setshowLinkCategories] = useState(false);
  const [showShareBox, setshowShareBox] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='noteTools'
    >
      {!item.isDeleted && !item.isArchive ? (
        <>
          <button
            onClick={() => {
              if (showEditedNote) {
                setshowEditedNote(false);
                setidShowEditedNote(null);
              } else {
                setshowEditedNote(true);
                setidShowEditedNote(item.id);
              }
            }}
            aria-label='Edit note'
            className='tooltipParent'
          >
            {showEditedNote ? (
              <>
                <i className='fas fa-times'></i>
                <span className='tooltip'>Close</span>
              </>
            ) : (
              <>
                <i className='fas fa-pen'></i>
                <span className='tooltip'>Edit note</span>
              </>
            )}
          </button>

          <button aria-label='Change color' className='tooltipParent'>
            <i className='fas fa-palette'></i>
            <span className='tooltip'>Change color</span>
            <ChangeColor
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
            />
          </button>

          <button
            aria-label='Add checkboxes'
            onClick={() => addCheckboxes(notes, setnotes, item.id)}
            className='tooltipParent'
          >
            <i className='far fa-check-square'></i>
            <span className='tooltip'>Add checkboxes</span>
          </button>

          <button
            aria-label='Encrypt/Decrypt Note'
            onClick={() => encryptNote(notes, setnotes, item.id)}
            className='tooltipParent'
          >
            <i className='fas fa-key'></i>
            <span className='tooltip'>Encrypt note</span>
          </button>

          <button
            aria-label='Link to group'
            className='tooltipParent'
            onClick={() => setshowLinkCategories(!showLinkCategories)}
          >
            <i className='fas fa-link'></i>
            <span className='tooltip'>Link to category</span>
            <LinkToCategories
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
              categoriesTable={categoriesTable}
              showLinkCategories={showLinkCategories}
              setshowLinkCategories={setshowLinkCategories}
            />
          </button>

          <button
            aria-label='Share note'
            className='tooltipParent'
            onClick={() => setshowShareBox(!showShareBox)}
          >
            <i className='fas fa-share'></i>
            <span className='tooltip'>Share note</span>
            <Share
              notesArray={notes}
              id={item.id}
              showShareBox={showShareBox}
              setshowShareBox={setshowShareBox}
            />
          </button>

          <button
            aria-label='Archive note'
            className='tooltipParent categoryDeleteButton'
          >
            <i className='fas fa-archive'></i>
            <span className='tooltip'>Archive note</span>
            <ArchiveNote
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
            />
          </button>

          <button
            aria-label='Delete note'
            className='tooltipParent categoryDeleteButton'
          >
            <i className='far fa-trash-alt'></i>
            <span className='tooltip'>Delete note</span>
            <PreDelete
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
            />
          </button>
        </>
      ) : item.isDeleted ? (
        <>
          <button
            aria-label='Restore note'
            className='tooltipParent categoryDeleteButton'
          >
            <i className='fas fa-undo'></i>
            <span className='tooltip'>Restore note</span>
            <PreDelete
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
              showRestoreIcon={true}
            />
          </button>

          <button
            aria-label='Delete note'
            className='tooltipParent categoryDeleteButton'
          >
            <i className='far fa-trash-alt'></i>
            <span className='tooltip'>Delete note</span>
            <Delete setnotesArray={setnotes} notesArray={notes} id={item.id} />
          </button>
        </>
      ) : (
        <>
          <button
            aria-label='Restore note'
            className='tooltipParent categoryDeleteButton'
          >
            <i className='fas fa-archive'></i>
            <span className='tooltip'>Restore note</span>
            <ArchiveNote
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
            />
          </button>

          <button
            aria-label='Delete note'
            className='tooltipParent categoryDeleteButton'
          >
            <i className='far fa-trash-alt'></i>
            <span className='tooltip'>Delete note</span>
            <PreDelete
              setnotesArray={setnotes}
              notesArray={notes}
              id={item.id}
              showRestoreIcon={false}
            />
          </button>
        </>
      )}
    </div>
  );
}
