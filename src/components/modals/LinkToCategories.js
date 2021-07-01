import React, { useEffect, useState } from 'react';
import 'css/modals/LinkToCategories.css';
import { createPortal } from 'react-dom';

export default function LinkToCategories({
  setnotesArray,
  notesArray,
  id,
  categoriesTable,
  showLinkCategories,
  setshowLinkCategories,
}) {
  const [note, setnote] = useState(notesArray.find((item) => item.id == id));

  const linkNoteToGroup = (noteId, groupId) => {
    const tempNotes = notesArray.map((item) => {
      if (item.id == noteId) {
        if (item.groups[groupId]) item.groups[groupId] = null;
        else item.groups[groupId] = categoriesTable[groupId].name;

        const makeNull = (i) => (item.groups[i] = null);
        for (let i = 0; i < item.groups.length; i++) {
          item.groups[i] == undefined && makeNull(i);
        }
      }
      return item;
    });
    setnotesArray(tempNotes);
  };
  useEffect(() => {
    console.log('usefekt');
  }, []);

  return createPortal(
    <>
      {showLinkCategories && (
        <div className='linkToGroupBox modalBox'>
          {/* <span className='titleSection'>Link to category</span> */}
          <ul className='linkGroups scrollClass'>
            {categoriesTable.map((item, index) => (
              <li className='linkGroup'>
                <input
                  checked={note.groups.includes(item.name)}
                  type='checkbox'
                  onChange={() => linkNoteToGroup(id, index)}
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
