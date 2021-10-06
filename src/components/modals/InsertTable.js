import React, { useEffect, useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertTable.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import ContentEditable from 'react-contenteditable';

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
        label: 'Column name',
      },
      {
        label: 'Column name',
      },
    ],
    rows: [
      {
        data: [' ', ' '],
      },
    ],
  });

  useEffect(() => {
    setTable(
      data && data.data
        ? data.data.tableDataset
        : {
            columns: [
              {
                label: 'Column name',
              },
              {
                label: 'Column name',
              },
            ],
            rows: [
              {
                data: [' ', ' '],
              },
            ],
          },
    );
  }, [showBox]);

  const handleSubmit = () => {
    !isNaN(numberOfElement)
      ? setnotebooks(
          notebooks.map((item1, index1) => {
            if (item1.id == id) {
              item1.cards.map((item2, index2) => {
                if (index2 + 1 == currentPage) {
                  item2.elements[numberOfElement] = {
                    type: 'table',
                    frame: {
                      translate:
                        data && data.data ? data.frame.translate : [0, 0],
                      rotate: data && data.data ? data.frame.rotate : 0,
                      width: data && data.data ? data.frame.width : null,
                      height: data && data.data ? data.frame.height : null,
                    },
                    value: (
                      <table className='tableGlobal'>
                        <tr>
                          {updateForce &&
                            table.columns.map((item, index) => (
                              <th
                                dangerouslySetInnerHTML={{ __html: item.label }}
                              ></th>
                            ))}
                        </tr>

                        {updateForce &&
                          table.rows.map((item, index) => (
                            <tr key={index}>
                              {item.data.map((item2, index2) => (
                                <td
                                  dangerouslySetInnerHTML={{ __html: item2 }}
                                ></td>
                              ))}
                            </tr>
                          ))}
                      </table>
                    ),
                    data: { tableDataset: table },
                  };
                }
                return item2;
              });
            }
            return item1;
          }),
        )
      : setnotebooks(
          notebooks.map((item1, index1) => {
            if (item1.id == id) {
              item1.cards.map((item2, index2) => {
                if (index2 + 1 == currentPage) {
                  item2.elements.push({
                    type: 'table',
                    frame: {
                      translate: [0, 0],
                      rotate: 0,
                      width: 100,
                      height: 100,
                    },
                    value: (
                      <table className='tableGlobal'>
                        <tr>
                          {updateForce &&
                            table.columns.map((item, index) => (
                              <th
                                dangerouslySetInnerHTML={{ __html: item.label }}
                              ></th>
                            ))}
                        </tr>

                        {updateForce &&
                          table.rows.map((item, index) => (
                            <tr key={index}>
                              {item.data.map((item2, index2) => (
                                <td
                                  dangerouslySetInnerHTML={{ __html: item2 }}
                                ></td>
                              ))}
                            </tr>
                          ))}
                      </table>
                    ),
                    data: { tableDataset: table },
                  });
                }
                return item2;
              });
            }
            return item1;
          }),
        );

    setshowBox(false);
    setTable({
      columns: [
        {
          label: 'Column name',
        },
        {
          label: 'Column name',
        },
      ],
      rows: [
        {
          data: [' ', ' '],
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
    temp.columns.push({ label: 'Column name' });
    temp.rows.map((item, index) => {
      item.data.push('');
      return item;
    });
    setTable(temp);
    setupdateForce(updateForce + 1);
  };
  const handleChangeColTitle = (e, index) => {
    table.columns[index].label = e.target.value;
  };
  const handleChangeRowValue = (e, rowIndex, colIndex) => {
    table.rows[rowIndex].data[colIndex] = e.target.value;
  };
  const handleDeleteRow = (rowIndex) => {
    let temp = table;
    temp.rows = temp.rows.filter((item, index) => index != rowIndex);
    setTable(temp);
    setupdateForce(updateForce + 1);
  };
  const handleDeleteCol = (colIndex) => {
    let temp = table;
    temp.columns = temp.columns.filter((item, index) => index != colIndex);

    temp.rows = temp.rows.map((item) => {
      item.data = item.data.filter((item2, index2) => index2 != colIndex);
      return item;
    });
    console.log(temp.rows);
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
              <div className='tableTools'>
                {' '}
                <button onClick={handleAddRow} className='tableButton'>
                  Add row
                </button>
                <button onClick={handleAddCol} className='tableButton'>
                  Add Column
                </button>
              </div>
              <table className='tableGlobal'>
                <tr>
                  {updateForce &&
                    table.columns.map((item, index) => (
                      <td>
                        <div style={{ display: 'grid', placeItems: 'center' }}>
                          <button
                            className='deleteData'
                            onClick={() => handleDeleteCol(index)}
                          >
                            <i className='far fa-trash-alt'></i>
                          </button>
                        </div>
                      </td>
                    ))}
                </tr>
                <tr>
                  {updateForce &&
                    table.columns.map((item, index) => (
                      <ContentEditable
                        html={item.label}
                        disabled={false}
                        onChange={(e) => handleChangeColTitle(e, index)}
                        tagName={'th'}
                        key={index}
                      />
                    ))}
                </tr>
                {table.columns.length > 0 &&
                  updateForce &&
                  table.rows.map((item, index) => (
                    <tr key={index}>
                      {item.data.map((item2, index2) => (
                        <ContentEditable
                          html={item2}
                          disabled={false}
                          onChange={(e) =>
                            handleChangeRowValue(e, index, index2)
                          }
                          tagName={'td'}
                          key={index2}
                        />
                      ))}
                      <td style={{ display: 'grid', placeItems: 'center' }}>
                        <button
                          title='Delete'
                          className='deleteData'
                          onClick={() => handleDeleteRow(index)}
                        >
                          <i className='far fa-trash-alt'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
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
