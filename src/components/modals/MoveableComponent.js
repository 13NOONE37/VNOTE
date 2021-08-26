import React, { useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';

export default function App() {
  const targetRef = useRef(null);
  const [target, setTarget] = useState();
  const [frame, setFrame] = useState({
    translate: [0, 0],
  });
  useEffect(() => {
    setTarget(targetRef.current);
  }, []);
  alert(
    'https://daybrush.com/moveable/storybook/?path=/story/basic--rotatable',
  );
  return (
    <div className='container'>
      <div className='target' ref={targetRef}>
        <img
          src='https://kiwwwi.pl/wp-content/uploads/2020/10/cat-grafika-wektorowa.png"'
          style={{ width: '100%' }}
        />
      </div>
      <Moveable
        target={target}
        resizable={true}
        keepRatio={false}
        throttleResize={0}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        edge={false}
        zoom={1}
        origin={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onResizeStart={(e) => {
          e.setOrigin(['%', '%']);
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;

          frame.translate = beforeTranslate;
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        rotatable={true}
        throttleRotate={0}
        rotationPosition={'top'}
        origin={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onRotateStart={(e) => {
          e.set(frame.rotate);
        }}
        onRotate={(e) => {
          frame.rotate = e.beforeRotate;
          target.style.transform = `rotate(${e.beforeRotate}deg)`;
        }}
      />
    </div>
  );
}
