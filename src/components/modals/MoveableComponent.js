import React, { useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import 'css/modals/MoveableBox.css';

export default function App() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const [target, setTarget] = useState();
  const [frame, setFrame] = useState({
    translate: [0, 0],
    rotate: 0,
  });
  useEffect(() => {
    setTarget(targetRef.current);
  }, []);
  // alert(
  //   'https://daybrush.com/moveable/storybook/?path=/story/basic--rotatable',
  // );
  return (
    <div className='container' ref={containerRef}>
      <div className='target' ref={targetRef}>
        <img
          src='https://kiwwwi.pl/wp-content/uploads/2020/10/cat-grafika-wektorowa.png"'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <Moveable
        //Resize
        target={target}
        container={containerRef.current}
        scrollContainer={containerRef.current}
        resizable={true}
        keepRatio={false}
        throttleResize={0}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        edge={false}
        zoom={1}
        origin={false}
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
        //Rotate
        rotatable={true}
        throttleRotate={0}
        rotationPosition={'top'}
        onRotateStart={(e) => {
          e.set(frame.rotate);
        }}
        onRotate={(e) => {
          frame.rotate = e.beforeRotate;
          target.style.transform = `rotate(${e.beforeRotate}deg)`;
        }}
        //Drag
        draggable={true}
        dragArea={containerRef.current}
        throttleDrag={0}
        onDragStart={(e) => {
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          frame.translate = e.beforeTranslate;
        }}
        onRender={(e) => {
          const { translate, rotate } = frame;
          e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px) rotate(${rotate}deg)`;
        }}
      />
    </div>
  );
}
