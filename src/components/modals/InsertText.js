import React, { useEffect, useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertText.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

export default function InsertText({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
  currentPage,
  numberOfElement,
  data,
}) {
  const box = useRef(null);

  const [currentText, setcurrentText] = useState('');
  const [currentColor, setcurrentColor] = useState('#000000');
  const [currentBackColor, setcurrentBackColor] = useState('#00000000');
  const [currentFontFamily, setcurrentFontFamily] = useState('');

  useEffect(() => {
    // setcurrentChartType(data && data.data ? data.data.type : 4);
  }, [showBox]);

  const handleSubmit = () => {
    // if (chartValues.length >= 1) {
    //   numberOfElement
    //     ? setnotebooks(
    //         notebooks.map((item1, index1) => {
    //           if (item1.id == id) {
    //             item1.cards.map((item2, index2) => {
    //               if (index2 + 1 == currentPage) {
    //                 item2.elements[numberOfElement] = {
    //                   type: 'chart',
    //                   frame: {
    //                     translate: [0, 0],
    //                     rotate: 0,
    //                     width: null,
    //                     height: null,
    //                   },
    //                   value: (
    //                     <div
    //                       style={{
    //                         background: '#f8f8ff',
    //                         display: 'flex',
    //                         flexDirection: 'column',
    //                         alignItems: 'center',
    //                         padding: '10px',
    //                       }}
    //                     >
    //                       <h1 style={{ color: '#333', marginBottom: '15px' }}>
    //                         {currentTitle}
    //                       </h1>
    //                       <ChartTemplate
    //                         data={dataChart}
    //                         type={currentChartType}
    //                       />
    //                     </div>
    //                   ),
    //                   data: {
    //                     chartValues: chartValues,
    //                     type: currentChartType,
    //                     title: currentTitle,
    //                     label: currentLabel,
    //                   },
    //                 };
    //               }
    //               return item2;
    //             });
    //           }
    //           return item1;
    //         }),
    //       )
    //     : setnotebooks(
    //         notebooks.map((item1, index1) => {
    //           if (item1.id == id) {
    //             item1.cards.map((item2, index2) => {
    //               if (index2 + 1 == currentPage) {
    //                 item2.elements.push({
    //                   type: 'chart',
    //                   frame: {
    //                     translate: [0, 0],
    //                     rotate: 0,
    //                     width: null,
    //                     height: null,
    //                   },
    //                   value: (
    //                     <div
    //                       style={{
    //                         background: '#f8f8ff',
    //                         display: 'flex',
    //                         flexDirection: 'column',
    //                         alignItems: 'center',
    //                         padding: '10px',
    //                       }}
    //                     >
    //                       <h1 style={{ color: '#333', marginBottom: '15px' }}>
    //                         {currentTitle}
    //                       </h1>
    //                       <ChartTemplate
    //                         data={dataChart}
    //                         type={currentChartType}
    //                       />
    //                     </div>
    //                   ),
    //                   data: {
    //                     chartValues: chartValues,
    //                     type: currentChartType,
    //                     title: currentTitle,
    //                     label: currentLabel,
    //                   },
    //                 });
    //               }
    //               return item2;
    //             });
    //           }
    //           return item1;
    //         }),
    //       );
    //   setchartValues([
    //     {
    //       name: '',
    //       value: '',
    //     },
    //   ]);
    //   setcurrentTitle('');
    //   setcurrentLabel('');
    //   setshowBox(false);
    // }
  };

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
              <span>Enter text</span>
            </div>
            <div className='textPreview scrollClass'>
              <div className='textTools'>
                <select>
                  <option>font</option>
                </select>
                <button
                  onClick={(e) => {
                    document.execCommand('bold');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-bold'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand('italic');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-italic'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand('underline');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-underline'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand(
                      'hiliteColor',
                      false,
                      currentBackColor,
                    );
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-highlighter'></i>
                </button>
                <input
                  type='color'
                  value={currentBackColor}
                  onChange={(e) => {
                    setcurrentBackColor(e.target.value);
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                />

                <button
                  onClick={(e) => {
                    document.execCommand('foreColor', false, currentColor);
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-font'></i>
                </button>
                <input
                  type='color'
                  value={currentColor}
                  onChange={(e) => setcurrentColor(e.target.value)}
                />

                <button
                  onClick={(e) => {
                    document.execCommand('justifyLeft');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-align-left'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand('justifyCenter');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-align-center'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand('justifyFull');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-align-justify'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand('justifyRight');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-align-right'></i>
                </button>

                <button
                  onClick={(e) => {
                    document.execCommand('insertOrderedList');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-list-ol'></i>
                </button>
                <button
                  onClick={(e) => {
                    document.execCommand('insertUnorderedList');
                    e.currentTarget.classList.toggle('highlightedButton');
                  }}
                >
                  <i className='fas fa-list-ul'></i>
                </button>
              </div>

              <div
                className='textEditField'
                contentEditable={true}
                value={currentText}
                onChange={(e) => setcurrentText(e.target.innerHTML)}
              ></div>
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
