import React, { useEffect, useRef, useState } from 'react';
import MoveableComponent from 'components/main/MoveableComponent';
import 'css/main/MoveableBox.css';

export default function LayersRenderComponent({
  notebooks,
  setnotebooks,
  id,
  currentPage,
}) {
  const [target, setTarget] = useState(null);
  const [numberOfElement, setnumberOfElement] = useState(null);

  const containerRef = useRef(null);

  const [elements, setelements] = useState(
    notebooks
      .find((item, index) => item.id == id)
      .cards.find((item, index) => index + 1 == currentPage).elements,
  );

  return (
    <div
      className='layerContainer scrollClass'
      ref={containerRef}
      onClick={(e) => {
        e.target == containerRef.current && setTarget(null);
      }}
    >
      <MoveableComponent
        target={target}
        setTarget={setTarget}
        numberOfElement={numberOfElement}
        elements={elements}
        setelements={setelements}
      />
      {elements.map((element, index) => (
        <div
          className='target'
          key={index}
          style={{ zIndex: index + 1 }}
          onClick={(e) => {
            setTarget(e.currentTarget);
            setnumberOfElement(index);
          }}
        >
          {element.value}
        </div>
      ))}
    </div>
  );
}
