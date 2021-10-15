import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import 'css/modals/ShareNote.css';
import 'css/modals/InsertDraw.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import handleContentChange from 'utils/Global/handleContentChange';

export default function InsertDraw({
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

  // Draw stuff
  const [restoreArray, setrestoreArray] = useState([]);
  const [colorsArray, setcolorsArray] = useState(['#000000', '#ffffff']);
  const [index, setIndex] = useState(-1);

  const [isDrawing, setisDrawing] = useState(false);
  const [drawColor, setdrawColor] = useState('#ffffff');
  const [drawWidth, setdrawWidth] = useState(5);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (showBox) {
      setrestoreArray(data && data.data ? data.data.restoreArray : []);
      setcolorsArray(
        data && data.data ? data.data.colorsArray : ['#000000', '#ffffff'],
      );
      setIndex(data && data.data ? data.data.restoreArray.length - 1 : -1);

      const canvas = canvasRef.current;
      canvas.width = 680;
      canvas.height = 819;

      const context = canvas.getContext('2d');

      // context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = drawColor;
      context.lineWidth = drawWidth;
      context.lineJoin = 'bevel';

      contextRef.current = context;
    }
  }, [showBox]);

  useEffect(() => {
    handleRedraw();
  }, [index]);

  const handleDraw = ({ nativeEvent }) => {
    if (isDrawing) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };
  const handleStartDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineWidth = drawWidth;
    contextRef.current.strokeStyle = drawColor;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setisDrawing(true);
  };
  const handleStopDrawing = () => {
    contextRef.current.closePath();
    setisDrawing(false);

    setIndex(restoreArray.length);
    restoreArray.push(
      contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      ),
    );
  };
  const handleRedraw = () => {
    restoreArray.length > 0 &&
      contextRef.current.putImageData(restoreArray[index], 0, 0);
  };

  const handleSubmit = () => {
    const dataURL = canvasRef.current.toDataURL('image/png');

    const handleUpdate = () => {
      setnotebooks(
        notebooks.map((item1, index1) => {
          if (item1.id == id) {
            item1.cards.map((item2, index2) => {
              if (index2 + 1 == currentPage) {
                item2.elements[numberOfElement] = {
                  type: 'draw',
                  frame: data.frame,
                  value: (
                    <img
                      src={dataURL}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ),
                  data: {
                    restoreArray: restoreArray,
                    colorsArray: colorsArray,
                  },
                };
              }
              return item2;
            });
          }
          return item1;
        }),
      );
    };
    const handleAdd = () => {
      setnotebooks(
        notebooks.map((item1, index1) => {
          if (item1.id == id) {
            item1.cards.map((item2, index2) => {
              if (index2 + 1 == currentPage) {
                item2.elements.push({
                  type: 'draw',
                  frame: {
                    translate: [0, 0],
                    rotate: 0,
                    width: 680,
                    height: 890,
                  },
                  value: (
                    <img
                      src={dataURL}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ),
                  data: {
                    restoreArray: restoreArray,
                    colorsArray: colorsArray,
                  },
                });
              }
              return item2;
            });
          }
          return item1;
        }),
      );
    };

    !isNaN(numberOfElement) ? handleUpdate() : handleAdd();

    setIndex(-1);
    setrestoreArray([]);
    setcolorsArray(['#000000', '#ffffff']);
    setisDrawing(false);
    setdrawColor('#ffffff');
    setdrawWidth(5);
    setshowBox(false);
  };

  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='imageBox drawBox'>
            <div className='topBar'>
              <span>Enter text</span>
            </div>
            <div className='drawPreview scrollClass'>
              <div className='textTools'>
                <button
                  onClick={() => {
                    index - 1 < 0 ? setIndex(0) : setIndex(index - 1);
                  }}
                >
                  <i className='fas fa-undo'></i>
                </button>
                <button
                  onClick={() => {
                    index + 1 > restoreArray.length - 1
                      ? setIndex(restoreArray.length - 1)
                      : setIndex(index + 1);
                  }}
                >
                  <i className='fas fa-redo'></i>
                </button>
                <input
                  name='drawWidth'
                  type='range'
                  min={0.1}
                  max={100}
                  step={0.1}
                  onChange={(e) => handleContentChange(e, setdrawWidth)}
                  value={drawWidth}
                />
                <input
                  type='color'
                  value={drawColor}
                  onBlur={() => console.log('end')}
                  onChange={(e) => handleContentChange(e, setdrawColor)}
                />
                <span className='colorStatic'>
                  {colorsArray.map((item, index) => (
                    <>
                      <input
                        defaultChecked={item == drawColor}
                        key={index}
                        type='radio'
                        value={item}
                        name='color'
                        onClick={(e) => handleContentChange(e, setdrawColor)}
                        style={{ backgroundColor: `${item}` }}
                      />
                    </>
                  ))}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                ndex
                onMouseMove={handleDraw}
                onTouchMove={handleDraw}
                onMouseDown={handleStartDrawing}
                onTouchStart={handleStartDrawing}
                onMouseUp={handleStopDrawing}
                onMouseOut={() => {
                  isDrawing && contextRef.current.closePath();

                  setIndex(restoreArray.length);
                  restoreArray.push(
                    contextRef.current.getImageData(
                      0,
                      0,
                      canvasRef.current.width,
                      canvasRef.current.height,
                    ),
                  );
                }}
                onMouseEnter={() => {
                  isDrawing && contextRef.current.beginPath();
                }}
                onTouchEnd={handleStopDrawing}
              ></canvas>
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
