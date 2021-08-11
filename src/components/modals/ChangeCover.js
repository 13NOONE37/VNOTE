import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'css/modals/ColorModal.css';
import 'css/actions/ChangeCover.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import handleContentChange from 'utils/Global/handleContentChange';

export default function ChangeCover({
  notebooks,
  setnotebooks,
  id,
  showCoverBox,
  setshowCoverBox,
}) {
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
  const backgrounds = [
    'point-stars',
    'anchors-away',
    'jigsaw',
    'brick-wall',
    'bubbles',
    'circuit-board',
    'curtain',
    'dominos',
    'falling-traingles',
    'floating-cogs',
    'floor-tile',
    'glamorous',
    'hexagons',
    'food',
    'overlapping-circles',
    'random-shapes',
    'skulls',
    'temple',
    'tic-tac-toe',
    'topography',
    'wiggle',
  ];

  const box = useRef(null);

  const [currentColor, setcurrentColor] = useState('');
  const [numberBackground, setnumberBackground] = useState(0);

  useEffect(() => {
    notebooks.map((item) => {
      if (item.id == id) {
        setcurrentColor(item.color);
        setnumberBackground(backgrounds.indexOf(item.bgImage));
      }
    });
  }, []);

  useEffect(() => {
    currentColor != '' &&
      setnotebooks(
        notebooks.map((item) => {
          if (item.id == id) {
            item.color = currentColor;
            item.bgImage = backgrounds[numberBackground];
          }
          return item;
        }),
      );
  }, [currentColor, numberBackground]);

  const handleBackgroundChange = (directRight) => {
    if (directRight) {
      if (numberBackground > 19) {
        setnumberBackground(0);
      } else {
        setnumberBackground(numberBackground + 1);
      }
    } else {
      if (numberBackground < 1) {
        setnumberBackground(20);
      } else {
        setnumberBackground(numberBackground - 1);
      }
    }
  };

  return createPortal(
    <>
      {showCoverBox && (
        <div
          ref={box}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowCoverBox)}
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
                    style={{ backgroundColor: `hsl(${item}, 45%, 12%)` }}
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
            <span className='backgroundPicker'>
              <button className='arrowButton' onClick={handleBackgroundChange}>
                <i class='fas fa-arrow-circle-left'></i>
              </button>
              <div
                className={`backgroundPreview ${backgrounds[numberBackground]}`}
                style={{ backgroundColor: `hsl(${currentColor}, 45%, 12%)` }}
              ></div>
              <button className='arrowButton' onClick={handleBackgroundChange}>
                <i class='fas fa-arrow-circle-right'></i>
              </button>
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}

// const [numberBackground, setnumberBackground] = useState(
//   backgrounds.indexOf(notebooksArray[id - 1].bgImage),
// );

// useEffect(() => {
//   const tempNoteBooks = notebooksArray.map((item) => {
//     if (item.id == id) {
//       item.bgImage = backgrounds[numberBackground];
//       // item.color = e.target.value;
//     } else item.bgImage = item.bgImage;

//     return item;
//   });
//   setnotebooksArray(tempNoteBooks);
// }, [numberBackground]);

// const handleChangeBg = (isDirectionLeft) => {
//   const verifyNumber = (n) => {
//     if (n > backgrounds.length - 1) return 0;
//     else if (n < 0) return backgrounds.length - 1;
//     else return n;
//   };

//   if (isDirectionLeft) {
//     setnumberBackground(verifyNumber(numberBackground - 1));
//   } else {
//     setnumberBackground(verifyNumber(numberBackground + 1));
//   }
// };

// const [currentColor, setcurrentColor] = useState(
//   notebooksArray[id - 1].color,
// );

// const handleChangeValue = (e) => {
//   setcurrentColor(e.target.value);

//   const beforeEl = notebooksArray.slice(0, id - 1);
//   const afterEl = notebooksArray.slice(id);
//   let currentNotebook = notebooksArray.slice(id - 1, id);
//   currentNotebook[0].color = e.target.value;
//   currentNotebook[0].color = e.target.value;

//   setnotebooksArray([...beforeEl, ...currentNotebook, ...afterEl]);
// };

// return (
//   <div className='changeCoverBox modalBox'>
//     <span className='themesBox'>
//       <button
//         aria-label='Go left'
//         onClick={() => handleChangeBg(true)}
//         className='leftArrow arrowButton'
//       >
//         <i className='fas fa-chevron-circle-left'></i>
//       </button>
//       <span>Swap background</span>
//       <button
//         aria-label='Go right'
//         onClick={() => handleChangeBg(false)}
//         className='rightArrow arrowButton'
//       >
//         <i className='fas fa-chevron-circle-left'></i>
//       </button>
//     </span>
//     <span className='colorPicker'>
//       <input
//         style={{ '--thumb-color': currentColor }}
//         type='range'
//         min='0'
//         max='360'
//         value={currentColor}
//         onChange={handleChangeValue}
//       />
//     </span>
//   </div>
// );
// }
