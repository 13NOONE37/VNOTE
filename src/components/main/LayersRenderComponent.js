import React, { useRef, useState } from 'react';
import MoveableComponent from 'components/main/MoveableComponent';
import 'css/main/MoveableBox.css';

export default function LayersRenderComponent() {
  const [target, setTarget] = useState(null);
  const [numberOfElement, setnumberOfElement] = useState(null);

  const containerRef = useRef(null);

  const [elements, setelements] = useState([
    {
      type: 'image',
      frame: {
        translate: [0, 0],
        rotate: 0,
      },
      value: (
        <img
          src='https://ratatuj.pl/wp-content/uploads/2019/01/ratatouille_pixar_disney_two_rats-525x295.jpg'
          style={{ width: '100%', height: '100%' }}
        />
      ),
    },
    {
      type: 'text',
      frame: {
        translate: [0, 0],
        rotate: 0,
      },
      value: (
        <span>
          <b>szczur</b>
          <i> lur</i>
        </span>
      ),
    },
  ]);

  return (
    <div
      className='layerContainer scrollClass'
      ref={containerRef}
      onClick={(e) => {
        console.log(e.target);
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
          //   style={{ zIndex: index + 1 }}
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
