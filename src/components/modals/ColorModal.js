import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'css/modals/ColorModal.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import handleContentChange from 'utils/Global/handleContentChange';

export default function ColorModal({
  notesArray,
  setnotesArray,
  id,
  showColorModal,
  setshowColorModal,
}) {
  const box = useRef(null);
  const [currentColor, setcurrentColor] = useState(
    notesArray.find((item) => item.id == id).color,
  );

  const colorsArray = [
    '19',
    '45',
    '75',
    '165',
    '195',
    '225',
    '255',
    '315',
    '345',
  ];

  useEffect(() => {
    setnotesArray(
      notesArray.map((item) => {
        if (item.id == id) item.color = currentColor;

        return item;
      }),
    );
  }, [currentColor]);
  return createPortal(
    <>
      {showColorModal && (
        <div
          ref={box}
          onClick={(e) => handleClickOutside(e, box, setshowColorModal)}
          className='modalBox modalNoBackdrop'
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
