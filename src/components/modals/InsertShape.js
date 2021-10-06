import React, { useEffect, useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertShape.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

export default function InsertShape({
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
  const [currentShapeIndex, setcurrentShapeIndex] = useState(null);
  const [currentColor, setcurrentColor] = useState('#1eb36d');
  const shapes = [
    {
      name: 'Rectangle',
      shape: (
        <svg
          width='100%'
          preserveAspectRatio='none'
          viewBox='0 0 100 100'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='100' height='100' style={{ fill: currentColor }} />
        </svg>
      ),
    },
    {
      name: 'Ellipse',
      shape: (
        <svg
          viewBox='0 0 100 100'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='50' cy='50' r='50' style={{ fill: currentColor }} />
        </svg>
      ),
    },
    {
      name: 'Polygon',
      shape: (
        <svg
          viewBox='0 0 112 99'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M56 0L111.161 37.6586L90.0915 98.5914H21.9085L0.838722 37.6586L56 0Z'
            style={{ fill: currentColor }}
          />
        </svg>
      ),
    },
    {
      name: 'Arrow',
      shape: (
        <svg
          viewBox='0 0 110 104'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.50152 93.9326C7.46432 94.7602 8.10507 95.4613 8.93266 95.4985L22.419 96.1046C23.2466 96.1418 23.9477 95.5011 23.9849 94.6735C24.0221 93.8459 23.3813 93.1448 22.5537 93.1076L10.5658 92.5689L11.1046 80.581C11.1418 79.7534 10.5011 79.0523 9.67348 79.0151C8.84589 78.9779 8.14484 79.6187 8.10765 80.4463L7.50152 93.9326ZM100.988 7.89279L7.98804 92.8928L10.012 95.1072L103.012 10.1072L100.988 7.89279Z'
            style={{ fill: currentColor }}
          />
        </svg>
      ),
    },
    {
      name: 'Line',
      shape: (
        <svg viewBox='0 0 94 85' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <line
            x1='93.3353'
            y1='0.371052'
            x2='0.335142'
            y2='84.371'
            style={{ stroke: currentColor }}
          />
        </svg>
      ),
    },
    {
      name: 'Star',
      shape: (
        <svg viewBox='0 0 96 91' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M48 0L59.2257 34.5491H95.5528L66.1636 55.9017L77.3893 90.4509L48 69.0983L18.6107 90.4509L29.8364 55.9017L0.447174 34.5491H36.7743L48 0Z'
            style={{ fill: currentColor }}
          />
        </svg>
      ),
    },
    {
      name: 'Cloud',
      shape: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -87 463.83425 463'>
          <path
            d='m375.835938 112.957031c-5.851563 0-11.691407.582031-17.425782 1.742188-4.324218-21.582031-18.304687-39.992188-37.933594-49.957031-19.625-9.964844-42.738281-10.382813-62.714843-1.136719-18.078125-49.796875-73.101563-75.507813-122.898438-57.429688s-75.507812 73.105469-57.429687 122.898438c-43.621094 1.378906-78.078125 37.484375-77.4257815 81.121093.6562495 43.640626 36.1835935 78.691407 79.8281255 78.761719h296c48.597656 0 88-39.398437 88-88 0-48.601562-39.402344-88-88-88zm0 0'
            style={{ fill: currentColor }}
          />
        </svg>
      ),
    },
    {
      name: 'Heart',
      shape: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -20 464 464'>
          <path
            d='m340 0c-44.773438.00390625-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.19531275-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0'
            style={{ fill: currentColor }}
          />
        </svg>
      ),
    },
  ];
  useEffect(() => {
    setcurrentShapeIndex(data && data.data ? data.data.index : null);
    setcurrentColor(data && data.data ? data.data.fill : '#1eb36d');
  }, [showBox]);

  const handleSubmit = () => {
    const handleUpdate = () => {
      setnotebooks(
        notebooks.map((item1, index1) => {
          if (item1.id == id) {
            item1.cards.map((item2, index2) => {
              if (index2 + 1 == currentPage) {
                item2.elements[numberOfElement] = {
                  type: 'svg',
                  frame: data.frame,
                  value: (
                    <svg
                      preserveAspectRatio='none'
                      style={{ width: '100%', height: '100%' }}
                      viewBox={shapes[currentShapeIndex].shape.props.viewBox}
                    >
                      {shapes[currentShapeIndex].shape.props.children}
                    </svg>
                  ),
                  data: {
                    fill: currentColor,
                    index: currentShapeIndex,
                    shape: shapes[currentShapeIndex].shape,
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
      if (shapes[currentShapeIndex].shape) {
        setnotebooks(
          notebooks.map((item1, index1) => {
            if (item1.id == id) {
              item1.cards.map((item2, index2) => {
                if (index2 + 1 == currentPage) {
                  item2.elements.push({
                    type: 'svg',
                    frame: {
                      translate: [0, 0],
                      rotate: 0,
                      width: null,
                      height: null,
                    },
                    value: (
                      <svg
                        preserveAspectRatio='none'
                        style={{ width: '100%', height: '100%' }}
                        viewBox={shapes[currentShapeIndex].shape.props.viewBox}
                      >
                        {shapes[currentShapeIndex].shape.props.children}
                      </svg>
                    ),
                    data: {
                      fill: currentColor,
                      index: currentShapeIndex,
                      shape: shapes[currentShapeIndex].shape,
                    },
                  });
                }
                return item2;
              });
            }
            return item1;
          }),
        );
        setshowBox(false);
      }
    };

    !isNaN(numberOfElement) ? handleUpdate() : handleAdd();

    setshowBox(false);
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
              <span>Choose shape</span>
            </div>
            <div className='textTools'>
              <input
                type='color'
                value={currentColor}
                onChange={(e) => setcurrentColor(e.target.value)}
              />
            </div>
            <div className='shapePreview scrollClass'>
              {shapes.map((shape, index) => (
                <button
                  className='shapeBox'
                  onClick={() => setcurrentShapeIndex(index)}
                  onDoubleClick={handleSubmit}
                >
                  <span>{shape.name}</span>
                  {shape.shape}
                </button>
              ))}
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
