import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MoveableComponent from 'components/main/MoveableComponent';
import 'css/main/MoveableBox.css';
import InsertChart from 'components/modals/InsertChart';
import DrawNotebook from 'components/modals/DrawNotebook';
import InsertCode from 'components/modals/InsertCode';
import InsertShape from 'components/modals/InsertShape';
import InsertText from 'components/modals/InsertText';

export default function LayersRenderComponent({
  notebooks,
  setnotebooks,
  id,
  currentPage,
}) {
  const [showChartBox, setshowChartBox] = useState(false);
  const [showDrawBox, setshowDrawBox] = useState(false);
  const [showCodeBox, setshowCodeBox] = useState(false);
  const [showShapeBox, setshowShapeBox] = useState(false);
  const [showTextBox, setshowTextBox] = useState(false);

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
      case 'svg': {
        setshowShapeBox(true);
        break;
      }
      case 'text': {
        setshowTextBox(true);
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

  useLayoutEffect(() => {
    //memory leak
    window.onkeydown = (e) => {
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
        console.log('delete', target, numberOfElement);
        setnotebooks(
          notebooks.map((item, index) => {
            if (item.id == id) {
              item.cards[currentPage - 1].elements = item.cards[
                currentPage - 1
              ].elements.filter((item2, index2) => index2 != numberOfElement);
            }
            return item;
          }),
        );
      }
    };
  });

  return (
    <div
      className='layerContainer scrollClass2'
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
      <InsertText
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showTextBox}
        setshowBox={setshowTextBox}
        currentPage={currentPage}
        numberOfElement={numberOfElement}
        data={data}
      />
      <InsertShape
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showShapeBox}
        setshowBox={setshowShapeBox}
        currentPage={currentPage}
        numberOfElement={numberOfElement}
        data={data}
      />
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
