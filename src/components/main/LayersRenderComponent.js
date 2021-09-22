import React, { useEffect, useRef, useState } from 'react';
import MoveableComponent from 'components/main/MoveableComponent';
import 'css/main/MoveableBox.css';
import InsertChart from 'components/modals/InsertChart';
import DrawNotebook from 'components/modals/DrawNotebook';
import InsertCode from 'components/modals/InsertCode';
import { number } from 'yup/lib/locale';

export default function LayersRenderComponent({
  notebooks,
  setnotebooks,
  id,
  currentPage,
}) {
  const [showChartBox, setshowChartBox] = useState(false);
  const [showDrawBox, setshowDrawBox] = useState(false);
  const [showCodeBox, setshowCodeBox] = useState(false);

  const [target, setTarget] = useState(null);
  const [numberOfElement, setnumberOfElement] = useState(null);
  const [elements, setelements] = useState(
    notebooks
      .find((item, index) => item.id == id)
      .cards.find((item, index) => index + 1 == currentPage).elements,
  );

  const containerRef = useRef(null);

  const [data, setdata] = useState({});
  const handleClickEdit = () => {
    setdata(
      notebooks
        .filter((item) => item.id == id)[0]
        .cards[currentPage - 1].elements.filter(
          (item, index) => index == numberOfElement,
        )[0],
    );

    switch (
      notebooks
        .filter((item) => item.id == id)[0]
        .cards[currentPage - 1].elements.filter(
          (item, index) => index == numberOfElement,
        )[0].type
    ) {
      case 'chart': {
        setshowChartBox(true);
        break;
      }
      case 'code': {
        setshowCodeBox(true);
        break;
      }
    }
  };
  useEffect(() => {
    setnotebooks(
      notebooks.map((item1, index1) => {
        if (item1.id == id) {
          item1.cards.map((item2, index2) => {
            if (index2 + 1 == currentPage) {
              item2.elements = elements;
            }
            return item2;
          });
        }
        return item1;
      }),
    );
  }, [elements]);

  useEffect(() => {
    //memory leak
    window.addEventListener('keydown', (e) => {
      // console.log('Execution of eventListener', e);
      if (e.ctrlKey && e.code == 'KeyX') {
        console.log('cut', target);
      }
      if (e.ctrlKey && e.code == 'KeyC') {
        console.log('copy', target);
      }
      if (e.ctrlKey && e.code == 'KeyV') {
        console.log('paste', target);
      }
      if (e.code == 'Delete') {
        console.log('delete', target);
      }
    });
  }, []);

  return (
    <div
      className='layerContainer '
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
          style={{
            zIndex: index + 1,
            transform: `translate(${element.frame.translate[0]}px, ${element.frame.translate[1]}px ) rotate(${element.frame.rotate}deg) `,
            width: `${element.frame.width}px`,
            height: `${element.frame.height}px`,
          }}
          onClick={(e) => {
            setTarget(e.currentTarget);
            setnumberOfElement(index);
          }}
        >
          {element.value}
        </div>
      ))}
      {target && (
        <button className='editButton' onClick={handleClickEdit}>
          <i className='fas fa-pen-square'></i>
          Edit
        </button>
      )}
      {/* <InsertText/> */}
      <InsertChart
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showChartBox}
        setshowBox={setshowChartBox}
        currentPage={currentPage}
        numberOfElement={numberOfElement}
        data={data}
      />
      <DrawNotebook
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showDrawBox}
        setshowBox={setshowDrawBox}
        currentPage={currentPage}
        numberOfElement={numberOfElement}
      />
      <InsertCode
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showCodeBox}
        setshowBox={setshowCodeBox}
        currentPage={currentPage}
        numberOfElement={numberOfElement}
        data={data}
      />
    </div>
  );
}
