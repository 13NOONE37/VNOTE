import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'css/modals/ColorModal.css';
import 'css/actions/ChangeCover.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import handleContentChange from 'utils/Global/handleContentChange';

export default function TogglePaper({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const colorsArray = ['45', '75', '165', '221'];
  const paperArray = ['linePaper', 'graphPaper', 'texturePaper'];

  const box = useRef(null);

  const [currentColor, setcurrentColor] = useState(
    notebooks.find((item) => item.id == id).paperColor,
  );
  const [currentPaper, setcurrentPaper] = useState(
    notebooks.find((item) => item.id == id).paperType,
  );

  useEffect(() => {
    setnotebooks(
      notebooks.map((item) => {
        if (item.id == id) {
          item.paperColor = currentColor;
          item.paperType = currentPaper;
        }
        return item;
      }),
    );
  }, [currentColor, currentPaper]);

  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
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
                    style={{
                      backgroundColor: `hsl(${item}, 30%, 75%)`,
                      border: 'none',
                    }}
                  />
                </>
              ))}
            </span>
            <span className='backgroundPicker'>
              {paperArray.map((item, index) => (
                <input
                  className={`paperRadio ${item}`}
                  defaultChecked={item == currentPaper}
                  key={index}
                  type='radio'
                  value={item}
                  name='paper'
                  onClick={(e) => handleContentChange(e, setcurrentPaper)}
                  style={{ backgroundColor: `hsl(${currentColor}, 30%, 75%)` }}
                />
              ))}
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
