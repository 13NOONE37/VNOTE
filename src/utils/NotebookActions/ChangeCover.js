import React, { useEffect, useState } from 'react';
import '../../../../../../css/Apps/VNote/Actions/ChangeCover.css';

export default function ChangeCover({ notebooks, setnotebooks, id }) {
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
    'texture',
    'tic-tac-toe',
    'topography',
    'wiggle',
  ];

  const [numberBackground, setnumberBackground] = useState(
    backgrounds.indexOf(notebooks[id - 1].bgImage),
  );

  useEffect(() => {
    const tempNoteBooks = notebooks.map((item) => {
      if (item.id == id) {
        item.bgImage = backgrounds[numberBackground];
        // item.color = e.target.value;
      } else item.bgImage = item.bgImage;

      return item;
    });
    setnotebooks(tempNoteBooks);
  }, [numberBackground]);

  const handleChangeBg = (isDirectionLeft) => {
    const verifyNumber = (n) => {
      if (n > backgrounds.length - 1) return 0;
      else if (n < 0) return backgrounds.length - 1;
      else return n;
    };

    if (isDirectionLeft) {
      setnumberBackground(verifyNumber(numberBackground - 1));
    } else {
      setnumberBackground(verifyNumber(numberBackground + 1));
    }
  };

  const [currentColor, setcurrentColor] = useState(notebooks[id - 1].color);

  const handleChangeValue = (e) => {
    setcurrentColor(e.target.value);

    const beforeEl = notebooks.slice(0, id - 1);
    const afterEl = notebooks.slice(id);
    let currentNotebook = notebooks.slice(id - 1, id);
    currentNotebook[0].color = e.target.value;
    currentNotebook[0].color = e.target.value;

    setnotebooks([...beforeEl, ...currentNotebook, ...afterEl]);
  };

  return (
    <div className='changeCoverBox modalBox'>
      <span className='themesBox'>
        <button
          aria-label='Go left'
          onClick={() => handleChangeBg(true)}
          className='leftArrow arrowButton'
        >
          <i className='fas fa-chevron-circle-left'></i>
        </button>
        <span>Swap background</span>
        <button
          aria-label='Go right'
          onClick={() => handleChangeBg(false)}
          className='rightArrow arrowButton'
        >
          <i className='fas fa-chevron-circle-left'></i>
        </button>
      </span>
      <span className='colorPicker'>
        <input
          style={{ '--thumb-color': currentColor }}
          type='range'
          min='0'
          max='360'
          value={currentColor}
          onChange={handleChangeValue}
        />
      </span>
    </div>
  );
}
