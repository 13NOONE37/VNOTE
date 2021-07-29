import React, { useRef, useState } from 'react';
import 'css/modals/LinkToCategories.css';
import { createPortal } from 'react-dom';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';

export default function LinkToCategories({
  setnotesArray,
  notesArray,
  id,
  categoriesTable,
  showLinkCategories,
  setshowLinkCategories,
}) {
  const [note, setnote] = useState(notesArray.find((item) => item.id == id));
  const box = useRef(null);

  const linkNoteToGroup = (noteId, group) => {
    const tempNotes = notesArray.map((item) => {
      if (item.id == noteId) {
        console.log(item.groups.includes(group), group);
        if (item.groups.includes(group)) {
          //already is in group so we have to delete it
          item.groups = item.groups.filter((el) => el != group);
        } else {
          //we have to add note to group
          item.groups.push(group);
        }
      }
      return item;
    });
    setnotesArray(tempNotes);
  };

  return createPortal(
    <>
      {showLinkCategories && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowLinkCategories)}
        >
          <div className='linkBox'>
            <span className='titleSection'>Add category</span>
            <ul className='linkGroups scrollClass'>
              {categoriesTable.map((item, index) => (
                <li className='linkGroup'>
                  <input
                    checked={note.groups.includes(item.name)}
                    type='checkbox'
                    onChange={() => linkNoteToGroup(id, item.name)}
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>

            <span className='closeSection'>
              <button
                onClick={() => {
                  setshowLinkCategories(false);
                }}
                className='addCategoryDone'
              >
                Done
              </button>
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
