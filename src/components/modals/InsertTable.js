import React, { useEffect, useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertTable.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

export default function InsertTable({
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

  useEffect(() => {
    // setcurrentText(data && data.data ? data.data.text : '');
  }, [showBox]);

  const handleSubmit = () => {
    // setcurrentText(edit.current.innerHTML);
    // numberOfElement
    //   ? setnotebooks(
    //       notebooks.map((item1, index1) => {
    //         if (item1.id == id) {
    //           item1.cards.map((item2, index2) => {
    //             if (index2 + 1 == currentPage) {
    //               item2.elements[numberOfElement] = {
    //                 type: 'table',
    //                 frame: {
    //                   translate:
    //                     data && data.data ? data.frame.translate : [0, 0],
    //                   rotate: data && data.data ? data.frame.rotate : 0,
    //                   width: data && data.data ? data.frame.width : null,
    //                   height: data && data.data ? data.frame.height : null,
    //                 },
    //                 value: <div className='scrollClass'></div>,
    //                 data: {},
    //               };
    //             }
    //             return item2;
    //           });
    //         }
    //         return item1;
    //       }),
    //     )
    //   : setnotebooks(
    //       notebooks.map((item1, index1) => {
    //         if (item1.id == id) {
    //           item1.cards.map((item2, index2) => {
    //             if (index2 + 1 == currentPage) {
    //               item2.elements.push({
    //                 type: 'table',
    //                 frame: {
    //                   translate: [0, 0],
    //                   rotate: 0,
    //                   width: 100,
    //                   height: 100,
    //                 },
    //                 value: <div className='scrollClass'></div>,
    //                 data: {},
    //               });
    //             }
    //             return item2;
    //           });
    //         }
    //         return item1;
    //       }),
    //     );
    // setshowBox(false);
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
            <div className='tablePreview scrollClass'>
              <table>
                <tr>
                  <td contentEditable>12345</td>
                  <td contentEditable>23456</td>
                  <td contentEditable>3324234</td>
                </tr>
                <tr>
                  <td contentEditable>1123123</td>
                  <td contentEditable>1232</td>
                  <td contentEditable>3213123</td>
                </tr>
                <tr>
                  <td contentEditable>1123123</td>
                  <td contentEditable>212323</td>
                  <td contentEditable>11231233</td>
                </tr>
              </table>
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
