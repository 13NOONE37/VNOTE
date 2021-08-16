import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import 'css/modals/SearchModal.css';
import 'css/modals/modalConfig.css';

export default function PrintNotebook({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const box = useRef(null);

  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onMouseDown={(e) => {
            handleClickOutside(e, box, setshowBox);
          }}
        >
          <div className='searchBox'>SAD</div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
