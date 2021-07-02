import React, { useEffect, useState } from 'react';

import NoteTools from 'components/main/NoteTools';
import EditNote from 'components/modals/EditNote';

import 'css/main/Note.css';

export default function Note({
  categoryTypeHere,
  renderType,
  notesArray,
  setnotesArray,
  isNewNote,
  setisNewNote,
}) {
  const handleTypeDecide = (
    isPinned,
    isDeleted,
    isArchive,
    isShared,
    isSecret,
    groups,
    renderTypeHere,
    categoryTypeHere,
  ) => {
    // renderType values:
    // other
    // pinned
    // deleted
    //archive
    // shared
    // secret
    // category for certain categories

    let currentType = 'other';

    //categories filtering
    if (renderTypeHere == 'category' && !isDeleted && !isArchive) {
      if (groups.includes(categoryTypeHere)) return true;
    }

    //other
    else if (renderTypeHere != 'category') {
      if (isDeleted) {
        currentType = 'deleted';
        return currentType === renderTypeHere;
      } else if (isArchive) {
        currentType = 'archive';
        return currentType === renderTypeHere;
      } else {
        if (isPinned) currentType = 'pinned';
        if (isSecret) currentType = 'secret';
        if (isShared) currentType = 'shared';
      }
      return currentType === renderTypeHere;
    }
  };

  const handlePinNote = (e, id) => {
    e.stopPropagation();
    const tempNotes = notesArray.map((item) => {
      if (item.id == id) item.isPinned = !item.isPinned;

      return item;
    });

    setnotesArray(tempNotes);
  };

  const handleChangeCheckboxState = (noteId, taskId) => {
    setnotesArray(
      notesArray.map((item) => {
        if (item.id == noteId) {
          item.doneTasks[taskId] = !item.doneTasks[taskId];

          const makeNull = (i) => (item.doneTasks[i] = false);
          for (let i = 0; i < item.doneTasks.length; i++) {
            item.doneTasks[i] == undefined && makeNull(i);
          }
        }

        return item;
      }),
    );
  };

  const [showEditedNote, setshowEditedNote] = useState(false);
  const [idShowEditedNote, setidShowEditedNote] = useState(null);

  useEffect(() => {
    if (isNewNote) {
      const temp = notesArray;

      const newId = parseInt(
        `${Date.now()}${Math.floor(Math.random() * 100)}${
          (Date.now() / Math.random()) * 3
        }`,
      );
      temp.unshift({
        id: newId,
        title: '',
        content: ``,
        doneTasks: [],
        color: 0,
        isPinned: false,
        isCheckboxList: false,
        groups: [],
        isDeleted: false,
        isArchive: false,
        isShared: false,
        isSecret: false,
      });
      setnotesArray(temp);
      setshowEditedNote(true);
      setidShowEditedNote(newId);
      setisNewNote(!isNewNote);
    }
  }, [isNewNote]);

  return notesArray.map((item, index) => {
    return (
      handleTypeDecide(
        item.isPinned,
        item.isDeleted,
        item.isArchive,
        item.isShared,
        item.isSecret,
        item.groups,
        renderType,
        categoryTypeHere,
      ) && (
        <div
          key={index}
          tabIndex={index}
          onClick={(e) => {
            setshowEditedNote(true);
            setidShowEditedNote(item.id);
          }}
          key={index}
          className='note'
          style={{
            backgroundImage: `linear-gradient(45deg, hsl(${item.color},45%,14%), hsl(${item.color},45%,20%))`,
          }}
        >
          {showEditedNote &&
            idShowEditedNote == item.id &&
            !item.isDeleted &&
            !item.isArchive && (
              <EditNote
                notesArray={notesArray}
                setnotesArray={setnotesArray}
                id={item.id}
                setshowEditedNote={setshowEditedNote}
                showEditedNote={showEditedNote}
                handlePinNote={handlePinNote}
                handleChangeCheckboxState={handleChangeCheckboxState}
                setidShowEditedNote={setidShowEditedNote}
              />
            )}

          {!item.isDeleted && (
            <button
              onClick={(e) => handlePinNote(e, item.id)}
              className={`notePin ${
                item.isPinned ? 'pinnedNote' : 'unpinnedNote'
              }`}
            >
              <i className='fas fa-thumbtack notePin'></i>
            </button>
          )}
          <span className='noteTitle'>
            {item.title ? item.title : String.fromCharCode(0)}
          </span>
          <span className='noteContent scrollClass'>
            {item.content && item.isCheckboxList ? (
              <div className='tasksList'>
                {item.content.split('\n').map(
                  (task, n) =>
                    task.length > 0 && (
                      <span
                        key={n}
                        className={`${item.doneTasks[n] ? 'doneTask' : null}`}
                      >
                        <input
                          // disabled={`${!item.isDeleted}`}
                          checked={item.doneTasks[n]}
                          type='checkbox'
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => handleChangeCheckboxState(item.id, n)}
                        />

                        {`${task}\n`}
                      </span>
                    ),
                )}
              </div>
            ) : (
              item.content
            )}
          </span>

          <NoteTools
            item={item}
            showEditedNote={showEditedNote}
            setshowEditedNote={setshowEditedNote}
            setidShowEditedNote={setidShowEditedNote}
          />
        </div>
      )
    );
  });
}
