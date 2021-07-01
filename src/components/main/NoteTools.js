import React from 'react';

import 'css/main/NoteTools.css';

import encryptNote from 'utils/NoteActions/encryptNote';
import ChangeColor from 'utils/NoteActions/ChangeColor';
import addCheckboxes from 'utils/NoteActions/addCheckboxes';
import LinkToCategories from 'utils/NoteActions/LinkToCategories';
import Share from 'utils/NoteActions/share';
import ArchiveNote from 'utils/NoteActions/ArchiveNote';
import PreDelete from 'utils/NoteActions/preDelete';
import Delete from 'utils/NoteActions/Delete';

export default function NoteTools({
  notesArray,
  setnotesArray,
  item,
  showEditedNote,
  setshowEditedNote,
  setidShowEditedNote,
}) {
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
            <i className='fas fa-pen'></i>
            <span className='tooltip'>Edit note</span>
          </button>

          <button aria-label='Change color' className='tooltipParent'>
            <i className='fas fa-palette'></i>
            <span className='tooltip'>Change color</span>
            <ChangeColor
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
            />
          </button>

          <button
            aria-label='Add checkboxes'
            onClick={() => addCheckboxes(notesArray, setnotesArray, item.id)}
            className='tooltipParent'
          >
            <i className='far fa-check-square'></i>
            <span className='tooltip'>Add checkboxes</span>
          </button>

          <button
            aria-label='Encrypt/Decrypt Note'
            onClick={() => encryptNote(notesArray, setnotesArray, item.id)}
            className='tooltipParent'
          >
            <i className='fas fa-key'></i>
            <span className='tooltip'>Encrypt note</span>
          </button>

          <button aria-label='Link to group' className='tooltipParent'>
            <i className='fas fa-link'></i>
            <span className='tooltip'>Link to category</span>
            <LinkToCategories
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
            />
          </button>

          <button aria-label='Share note' className='tooltipParent'>
            <i className='fas fa-share'></i>
            <span className='tooltip'>Share note</span>
            <Share notesArray={notesArray} id={item.id} />
          </button>

          <button aria-label='Archive note' className='tooltipParent'>
            <i className='fas fa-archive'></i>
            <span className='tooltip'>Archive note</span>
            <ArchiveNote
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
            />
          </button>

          <button aria-label='Delete note' className='tooltipParent'>
            <i className='far fa-trash-alt'></i>
            <span className='tooltip'>Delete note</span>
            <PreDelete
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
            />
          </button>
        </>
      ) : item.isDeleted ? (
        <>
          <button aria-label='Restore note' className='tooltipParent'>
            <i className='fas fa-undo'></i>
            <span className='tooltip'>Restore note</span>
            <PreDelete
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
              showRestoreIcon={true}
            />
          </button>

          <button aria-label='Delete note' className='tooltipParent'>
            <i className='far fa-trash-alt'></i>
            <span className='tooltip'>Delete note</span>
            <Delete
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
            />
          </button>
        </>
      ) : (
        <>
          <button aria-label='Restore note' className='tooltipParent'>
            <i className='fas fa-archive'></i>
            <span className='tooltip'>Restore note</span>
            <ArchiveNote
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
            />
          </button>

          <button aria-label='Delete note' className='tooltipParent'>
            <i className='far fa-trash-alt'></i>
            <span className='tooltip'>Delete note</span>
            <PreDelete
              setnotesArray={setnotesArray}
              notesArray={notesArray}
              id={item.id}
              showRestoreIcon={false}
            />
          </button>
        </>
      )}
    </div>
  );
}
