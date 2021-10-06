import React, { useEffect, useRef, useState } from 'react';
import 'css/main/LayersManager.css';

export default function LayersManager({
  notebooks,
  setnotebooks,
  id,
  currentPage,
  isEditMode,
}) {
  const [isCollapse, setisCollapse] = useState(false);
  const [updateForce, setupdateForce] = useState(1);

  const dragContainer = useRef(null);
  let dragSrcEl = null;
  const handleDragStart = (e) => {
    e.currentTarget.style.opacity = '0.6';

    dragSrcEl = e.currentTarget;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
  };
  const handleDragOver = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    return false;
  };
  const handleDragEnter = (e) => {
    e.currentTarget.classList.add('over');
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('over');
  };
  const handleDrop = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (dragSrcEl != e.currentTarget) {
      let pageToMove = null;
      const pageToMoveIndex = parseInt(dragSrcEl.getAttribute('element-index'));
      const pageAnchorIndex = parseInt(
        e.currentTarget.getAttribute('element-index'),
      );

      notebooks.map((item) => {
        if (item.id == id) {
          pageToMove = item.cards[pageToMoveIndex];
        }
      });

      setnotebooks(
        notebooks.map((item) => {
          if (item.id == id) {
            item.cards.splice(pageToMoveIndex, 1);
            item.cards.splice(pageAnchorIndex, 0, pageToMove);
          }
          return item;
        }),
      );
      // dragSrcEl.innerHTML = e.currentTarget.innerHTML;
      // e.currentTarget.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  };
  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setupdateForce(updateForce + 1);
    const elements = dragContainer.current.children;
    for (const element of elements) {
      element.classList.remove('over');
    }
  };

  return (
    <>
      {' '}
      <button
        className='collapseButton'
        onClick={() => setisCollapse(!isCollapse)}
      >
        <i
          className='fas fa-angle-up'
          style={{ transform: `rotate(${!isCollapse ? '90deg' : '-90deg'})` }}
        ></i>
        {/* Show/Hide */}
      </button>
      <div
        className='LayersManager'
        style={{ visibility: `${!isCollapse ? 'collapse' : 'visible'}` }}
      >
        <ul className='scrollClass' ref={dragContainer}>
          {updateForce &&
            notebooks.map(
              (item) =>
                item.id == id &&
                item.cards.map((item2, index2) => (
                  <li
                    element-index={index2}
                    key={index2}
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                    dangerouslySetInnerHTML={{
                      __html: `${index2 + 1}. ${item2.titleOfPage}`,
                    }}
                  ></li>
                )),
            )}
        </ul>
      </div>
    </>
  );
}
