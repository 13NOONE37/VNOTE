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

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const [isDrawing, setisDrawing] = useState(false);
  const handleMove = (e) => {
    if (isDrawing) {
      const { left, top } = canvasRef.current.getBoundingClientRect();
      const xPos = e.clientX - left;
      const yPos = e.clientY - top;
      console.log(xPos, yPos);
    }
  };
  const handleStart = () => setisDrawing(true);
  const handleStop = () => setisDrawing(false);
  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='notebookEdit'>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%' }}
              onMouseMove={handleMove}
              onTouchMove={handleMove}
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              onMouseUp={handleStop}
              onMouseOut={handleStop}
              onTouchEnd={handleStop}
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
