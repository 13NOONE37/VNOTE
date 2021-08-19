import React, { useEffect, useRef, useState } from 'react';
import 'css/modals/ShareNote.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

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
  const [isDrawing, setisDrawing] = useState(false);
  const [drawColor, setdrawColor] = useState('#000');
  const [drawWidth, setdrawWidth] = useState('5');
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
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setisDrawing(true);
  };

  const handleStopDrawing = () => {
    contextRef.current.closePath();
    setisDrawing(false);
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
          <div className='controlDraw'>
            {/* <input
              defaultChecked={item == drawColor}
              key={index}
              type='radio'
              value={item}
              name='color'
              onClick={(e) => handleContentChange(e, setcurrentColor)}
              style={{ backgroundColor: `hsl(${item}, 30%, 45%)` }}
            /> */}

            <input type='range' />
          </div>
          <div className='notebookEdit'>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%' }}
              onMouseMove={handleDraw}
              onTouchMove={handleDraw}
              onMouseDown={handleStartDrawing}
              onTouchStart={handleStartDrawing}
              onMouseUp={handleStopDrawing}
              onMouseOut={() => {
                isDrawing && contextRef.current.closePath();
              }}
              onMouseEnter={() => {
                isDrawing && contextRef.current.beginPath();
              }}
              onTouchEnd={handleStopDrawing}
            ></canvas>
            {/* Nowa Warstwa na stronie zeszytu którą można skalować a na niej
            rysujemy; Przy takim założeniu trzeba stworzyć system warstw których
            kolejność możnaby zmieniać na jakimś pasku po prawej; Trzeba też
            dodać opcje zwijania poszególnych pasków a nie tyko hide gui które
            jest realizowane poprzez 1 opcje na pasku */}
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
