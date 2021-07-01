import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ContentEditable from 'react-contenteditable';

import 'css/modals/EditNote.css';
import 'css/main//Note.css';

import NoteTools from 'components/main/NoteTools';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import handleContentChange from 'utils/Global/handleContentChange';
import handleTaskContentChange from 'utils/NoteActions/handleTaskContentChange';
import handleDeleteTask from 'utils/NoteActions/handleDeleteTask';

export default function EditNote({
  notesArray,
  setnotesArray,
  id,
  setshowEditedNote,
  showEditedNote,
  handlePinNote,
  handleChangeCheckboxState,
  setidShowEditedNote,
}) {
  const [note, setnote] = useState(notesArray.find((item) => item.id == id));
  const box = useRef(null);
  const [currentTitle, setcurrentTitle] = useState(note.title);
  const [currentContent, setcurrentContent] = useState(note.content);
  const [currentDoneTasks, setcurrentDoneTasks] = useState(note.doneTasks);

  useEffect(() => {
    setnotesArray(
      notesArray.map((item) => {
        if (item.id == id) {
          item.title = currentTitle;
          item.content = currentContent;
          item.doneTasks = currentDoneTasks;
        }
        return item;
      }),
    ); // jesli nie dziala zmienic na to z vnote-dirty
  }, [currentContent, currentTitle, currentDoneTasks]);

  const handleKeyDownPrevent = (e) => {
    if (e.keyCode == 9) {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&#009');
    }
  };

  return createPortal(
    <div
      className='modalBox'
      ref={box}
      onMouseDown={(e) => handleClickOutside(e, box, setshowEditedNote)}
    >
      <div
        tabIndex={id}
        className='note'
        style={{
          backgroundImage: `linear-gradient(45deg, hsl(${note.color},60%,14%), hsl(${note.color},60%,20%))`,
        }}
      >
        <button
          onClick={(e) => handlePinNote(e, note.id)}
          className={`notePin ${note.isPinned ? 'pinnedNote' : 'unpinnedNote'}`}
        >
          <i className='fas fa-thumbtack notePin'></i>
        </button>

        <textarea
          className='titleEdit hiddenScroll'
          onChange={(e) => handleContentChange(e, setcurrentTitle)}
          maxLength='100'
          placeholder='Set title...'
          value={currentTitle}
        ></textarea>

        <span className='noteContent hiddenScroll'>
          {note.content && note.isCheckboxList ? (
            <div className='tasksList'>
              {note.content.split('\n').map(
                (task, n) =>
                  task.length > 0 && (
                    <div className='taskParent' key={n}>
                      <input
                        tabIndex='-1'
                        checked={note.doneTasks[n]}
                        type='checkbox'
                        onChange={() => handleChangeCheckboxState(id, n)}
                      />

                      <ContentEditable
                        className={`${note.doneTasks[n] ? 'doneTask' : null}`}
                        html={task}
                        disabled={false}
                        onBlur={(e) =>
                          handleTaskContentChange(e, n, note, setcurrentContent)
                        }
                        onKeyDown={(e) => {
                          e.keyCode == 13 &&
                            handleTaskContentChange(
                              e,
                              n,
                              note,
                              setcurrentContent,
                            );
                        }}
                        tagName={'span'}
                      />

                      <button
                        tabIndex='-1'
                        contentEditable='false'
                        onClick={() =>
                          handleDeleteTask(
                            n,
                            note,
                            setcurrentContent,
                            currentDoneTasks,
                            setcurrentDoneTasks,
                          )
                        }
                        className='noteDeleteTask'
                      >
                        <i className='fas fa-times'></i>
                      </button>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <textarea
              className='hiddenScroll'
              placeholder='Add some content...'
              onKeyDown={handleKeyDownPrevent}
              onChange={(e) => handleContentChange(e, setcurrentContent)}
              value={currentContent}
            ></textarea>
          )}
        </span>

        <NoteTools
          notesArray={notesArray}
          setnotesArray={setnotesArray}
          item={note}
          showEditedNote={showEditedNote}
          setshowEditedNote={setshowEditedNote}
          setidShowEditedNote={setidShowEditedNote}
        />
        <button
          className='closeNoteEdit'
          onClick={() => {
            setshowEditedNote(!showEditedNote);
          }}
        >
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
