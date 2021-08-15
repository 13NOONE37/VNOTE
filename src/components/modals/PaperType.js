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
            <input type='checkbox' />
            <input type='checkbox' />
            <input type='checkbox' />
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
