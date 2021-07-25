import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import 'css/modals/SearchModal.css';
import 'css/modals/modalConfig.css';
import handleContentChange from 'utils/Global/handleContentChange';
import AppContext from 'store/appContext';

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

  const [searchResult, setsearchResult] = useState([]);
  const [searchContent, setsearchContent] = useState('');

  useEffect(() => {
    showBox && input.current.focus();
  }, [showBox]);

  useEffect(() => {
    setsearchResult([]);
    const temp = searchResult;
    notes.map((item) => {
      if (item.content.search(searchContent.trim()) != -1) {
        temp.push(item.id);
      }
    });
    setsearchResult(temp);
    console.log(searchResult);
  }, [searchContent]);

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
            <form className='searchField'>
              <input
                ref={input}
                type='text'
                placeholder='Type something...'
                value={searchContent}
                onChange={(e) => handleContentChange(e, setsearchContent)}
              />
              <button type='submit'>
                <i className='fas fa-search'></i>
              </button>
            </form>
            <span className='searchResult'>
              {searchResult.length > 0 ? (
                <h1>Notes</h1>
              ) : searchResult.length == 0 ? (
                <h1>No results</h1>
              ) : null}
            </span>
            <span className='preTypes'>
              <button>
                <i className='fas fa-list'></i> <span>Lists</span>
              </button>
              <button>
                <i className='fas fa-link'></i> <span>URLs</span>
              </button>
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
