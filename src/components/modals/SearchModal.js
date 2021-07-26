import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import 'css/modals/SearchModal.css';
import 'css/modals/modalConfig.css';
import handleContentChange from 'utils/Global/handleContentChange';
import AppContext from 'store/appContext';
import SearchNote from 'components/main/SearchNote';

export default function SearchModal({ showBox, setshowBox }) {
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

  const box = useRef(null);
  const input = useRef(null);

  const [searchContent, setsearchContent] = useState('');

  useEffect(() => {
    showBox && input.current.focus();
  }, [showBox]);

  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            handleClickOutside(e, box, setshowBox);
          }}
        >
          <div className='searchBox'>
            <span className='searchField'>
              <input
                ref={input}
                type='text'
                placeholder='Type something...'
                value={searchContent}
                onChange={(e) => handleContentChange(e, setsearchContent)}
              />
              <button disabled>
                <i className='fas fa-search'></i>
              </button>
            </span>
            <span className='searchResult scrollClass'>
              <SearchNote
                notesArray={notes}
                setnotesArray={setnotes}
                searchPhrase={searchContent}
              />
            </span>
            <span className='closeSection'>
              <button
                onClick={() => {
                  setshowBox(false);
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
