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
  const [updateForce, setupdateForce] = useState(1);
  const [table, setTable] = useState({
    columns: [
      {
        label: 'Name',
      },
      {
        label: 'Email',
      },
    ],
    rows: [
      {
        data: ['Oliwer', 'oliwerklauze22@gmail.com'],
      },
    ],
  });
  // const [rowsNumber, setrowsNumber] = useState(5);
  // const [colsNumber, setcolsNumber] = useState(3);

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
    setTable({
      columns: [
        {
          label: 'Name',
        },
        {
          label: 'Email',
        },
      ],
      rows: [
        {
          data: ['Oliwer', 'oliwerklauze22@gmail.com'],
        },
      ],
    });
  };
  const handleAddRow = () => {
    const temp = table;
    temp.rows.push({ data: [] });
    for (let i = 0; i < temp.columns.length; i++) {
      temp.rows[temp.rows.length - 1].data.push('');
    }

    setTable(temp);
    setupdateForce(updateForce + 1);
  };
  const handleAddCol = () => {
    const temp = table;
    temp.columns.push({ label: 'Password' });
    temp.rows.map((item, index) => {
      item.data.push('');
      return item;
    });
    setTable(temp);
    setupdateForce(updateForce + 1);
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
              <span>Create table</span>
            </div>
            <div className='tablePreview scrollClass'>
              <table>
                <tr>
                  {updateForce &&
                    table.columns.map((item, index) => (
                      <th contentEditable key={index}>
                        {item.label}
                      </th>
                    ))}
                </tr>

                {updateForce &&
                  table.rows.map((item, index) => (
                    <tr key={index}>
                      {item.data.map((item2, index2) => (
                        <td contentEditable key={index2}>
                          {item2}
                        </td>
                      ))}
                    </tr>
                  ))}
              </table>
              <button onClick={handleAddRow}>Add row</button>
              <button onClick={handleAddCol}>Add Col</button>
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
