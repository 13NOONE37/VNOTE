import React, { useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertChart.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import * as Chart from 'chart.js';

export default function InsertChart({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const box = useRef(null);

  const handleSubmit = () => {};

  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox '
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='imageBox'>
            <div className='topBar'>
              <span>Enter data</span>
            </div>
            <div className='chartPreview scrollClass'>
              <input
                type='text'
                placeholder='Chart Title'
                className='titleInput'
              />
              <span className='chartTypes'>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='verticalBar' />
                </span>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='horizontalBar' />
                </span>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='line' />
                </span>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='multiLine' />
                </span>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='doughnut' />
                </span>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='pie' />
                </span>
                <span className='type'>
                  <span>Name</span>
                  <input type='radio' name='chartType' value='polar' />
                </span>
              </span>
              <h1>
                <button className='collpaseButton'>
                  <i class='fas fa-caret-down'></i>
                </button>
                Data:
              </h1>
              <div className='dataField'>
                <div className='dataset'>
                  <input
                    type='text'
                    className='item'
                    placeholder='Type to add...'
                  />
                  <input type='text' className='value' placeholder='8%' />
                  <button className='deleteData'>
                    <i className='far fa-trash-alt'></i>
                  </button>
                </div>
                <button className='newData'>
                  <i className='fas fa-plus'></i>Add dataset
                </button>
              </div>
            </div>
            <div className='bottomBar'>
              <button
                onClick={() => {
                  setshowBox(false);
                }}
              >
                Cancel
              </button>
              <button onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
