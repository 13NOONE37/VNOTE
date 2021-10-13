import React, { useEffect, useRef, useState } from 'react';
import 'css/modals/ShareNote.css';
import 'css/modals/InsertDraw.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import handleContentChange from 'utils/Global/handleContentChange';

export default function DrawNotebook({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const box = useRef(null);
  const notebook = notebooks.filter((item) => item.id == id);

  // Draw stuff
  const [restoreArray, setrestoreArray] = useState([]);
  const [colorsArray, setcolorsArray] = useState(['#000000', '#ffffff']);
  let index = -1;
  const [isDrawing, setisDrawing] = useState(false);
  const [drawColor, setdrawColor] = useState('#000000');
  const [drawWidth, setdrawWidth] = useState(5);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (showBox) {
      const canvas = canvasRef.current;
      canvas.width = 700;
      canvas.height = 915;

      const context = canvas.getContext('2d');

      // context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = drawColor;
      context.lineWidth = drawWidth;
      context.lineJoin = 'bevel';

      contextRef.current = context;
    }
  }, [showBox]);
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

    index = restoreArray.length;
    restoreArray.push(
      contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      ),
    );
    console.log(restoreArray);
  };
  const handleRedraw = () => {
    contextRef.current.putImageData(restoreArray[index], 0, 0);
  };
  const handleSubmit = () => {};

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
              <button
                type='button'
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(notebooks),
                )}`}
                download='filename.json'
              >
                Download Json
              </button>
              <span>Enter text</span>
            </div>
            <div className='drawPreview scrollClass'>
              <div className='textTools'>
                <button
                  onClick={() => {
                    index - 1 < 0 ? (index = 0) : index--;
                    handleRedraw();
                  }}
                >
                  Undo
                </button>
                <button
                  onClick={() => {
                    index + 1 > restoreArray.length - 1
                      ? (index = restoreArray.length - 1)
                      : index++;
                    handleRedraw();
                  }}
                >
                  Redo
                </button>
                <input
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
                onMouseMove={handleDraw}
                onTouchMove={handleDraw}
                onMouseDown={handleStartDrawing}
                onTouchStart={handleStartDrawing}
                onMouseUp={handleStopDrawing}
                onMouseOut={() => {
                  isDrawing && contextRef.current.closePath();

                  index = restoreArray.length;
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
