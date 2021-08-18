import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ContentEditable from 'react-contenteditable';

import 'css/modals/EditNote.css';
import 'css/main/Note.css';

import Notify from 'components/other/Notify';
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

  const [showNotify, setshowNotify] = useState(false);

  const handleCheckLength = () => {
    currentTitle.length >= 99 ? setshowNotify(true) : setshowNotify(false);
  };

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
      className='modalBox editNoteBox'
      ref={box}
      onMouseDown={(e) => handleClickOutside(e, box, setshowEditedNote)}
    >
      {showNotify && (
        <Notify
          notifyType='Info'
          notifyContent={`Title can't be longer than 100 characters. `}
          notifyTime={12}
        />
      )}
      <div
        tabIndex={id}
        className='note'
        style={{
          backgroundImage: `linear-gradient(45deg, hsl(${note.color},45%,14%), hsl(${note.color},45%,20%))`,
        }}
      >
        <button
          onClick={(e) => handlePinNote(e, note.id)}
          className={`notePin ${note.isPinned ? 'pinnedNote' : 'unpinnedNote'}`}
        >
          <i className='fas fa-thumbtack notePin'></i>
        </button>

        <textarea
          className='titleEdit scrollClass'
          onChange={(e) => {
            handleContentChange(e, setcurrentTitle);
            handleCheckLength();
          }}
          maxLength='100'
          placeholder='Set title...'
          value={currentTitle}
        ></textarea>

        <span className='noteContent scrollClass'>
          {note.content && note.isCheckboxList ? (
            <span className='tasksList'>
              {note.content.split('\n').map(
                (task, n) =>
                  task.length > 0 && (
                    <div className=' task' key={n}>
                      <span className='bounce'>
                        <input
                          checked={note.doneTasks[n]}
                          type='checkbox'
                          onChange={() => handleChangeCheckboxState(note.id, n)}
                        />
                        <svg viewBox='0 0 21 21'>
                          <polyline points='5 10.75 8.5 14.25 16 6'></polyline>
                        </svg>
                      </span>
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
                        suppressContentEditableWarning={true}
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
            </span>
          ) : (
            <textarea
              className='scrollClass'
              placeholder='Add some content...'
              onKeyDown={handleKeyDownPrevent}
              onChange={(e) => handleContentChange(e, setcurrentContent)}
              value={currentContent}
            ></textarea>
          )}
        </span>

        <NoteTools
          item={note}
          showEditedNote={showEditedNote}
          setshowEditedNote={setshowEditedNote}
          setidShowEditedNote={setidShowEditedNote}
        />
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
