import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'css/modals/ColorModal.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import handleContentChange from 'utils/Global/handleContentChange';

export default function ColorModal({
  notebooksArray,
  setnotebooksArray,
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
          onClick={(e) => handleClickOutside(e, box, setshowBox)}
          className='modalBox'
        >
          <div className='colorBox'>
            <span className='colorStatic'>
              {colorsArray.map((item, index) => (
                <>
                  <input
                    defaultChecked={item == currentColor}
                    key={index}
                    type='radio'
                    value={item}
                    name='color'
                    onClick={(e) => handleContentChange(e, setcurrentColor)}
                    style={{ backgroundColor: `hsl(${item}, 45%, 20%)` }}
                  />
                </>
              ))}
            </span>
            <span className='colorPicker'>
              <input
                placeholder='0-360'
                type='number'
                min='0'
                max='360'
                value={currentColor}
                onChange={(e) => handleContentChange(e, setcurrentColor)}
              />
              <input
                style={{ '--thumb-color': currentColor }}
                type='range'
                min='0'
                max='360'
                value={currentColor}
                onChange={(e) => handleContentChange(e, setcurrentColor)}
              />
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
