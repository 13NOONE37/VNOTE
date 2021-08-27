import React, { useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import 'css/modals/MoveableBox.css';

export default function App() {
  const containerRef = useRef(null);

  const [isClicked, setisClicked] = useState(true);
  const [target, setTarget] = useState();
  const [frame, setFrame] = useState({
    translate: [0, 0],
    rotate: 0,
  });
  useEffect(() => {
    setTarget(document.querySelector('.target_num-0'));
  }, []);
  // alert(
  //   'https://daybrush.com/moveable/storybook/?path=/story/basic--rotatable',
  // );
  const handleClickDecide = (e) => {
    setTarget(e.currentTarget);
    const styles = getComputedStyle(e.currentTarget, null);

    const matrix =
      styles.getPropertyValue('-webkit-transform') ||
      styles.getPropertyValue('-moz-transform') ||
      styles.getPropertyValue('-ms-transform') ||
      styles.getPropertyValue('-o-transform') ||
      styles.getPropertyValue('transform') ||
      'none';
    console.log(matrix, styles);

    if (matrix != 'none') {
      let values = matrix.split('(')[1];
      values = values.split(')')[0];
      values = values.split(',');

      const a = values[0];
      const b = values[1];
      const c = values[2];
      const d = values[3];
      const e = values[4];
      const f = values[5];

      //Scale
      const scale = Math.sqrt(a * a + b * b);
      const sin = b / scale;

      //Rotate
      const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      console.log(`Rotate: ${angle}deg`);

      //Translate
      console.log(`Translate: X ${e}, Y ${f}`);

      // setFrame({
      //   translate: [e, f],
      //   rotate: angle,
      // });
    }
  };
  return (
    <div className='container' ref={containerRef}>
      <div className='target_num-0' onClick={handleClickDecide}>
        <img
          src='https://kiwwwi.pl/wp-content/uploads/2020/10/cat-grafika-wektorowa.png"'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className='target_num-1' onClick={handleClickDecide}>
        <h1>Hello</h1>
        <img
          src='https://kiwwwi.pl/wp-content/uploads/2020/10/cat-grafika-wektorowa.png"'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <Moveable
        //Resize
        target={isClicked ? target : null}
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
        dragArea={true}
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
