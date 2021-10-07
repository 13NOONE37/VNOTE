import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MoveableComponent from 'components/main/MoveableComponent';
import 'css/main/MoveableBox.css';
import InsertChart from 'components/modals/InsertChart';
import InsertDraw from 'components/modals/InsertDraw';
import InsertCode from 'components/modals/InsertCode';
import InsertShape from 'components/modals/InsertShape';
import InsertText from 'components/modals/InsertText';
import InsertTable from 'components/modals/InsertTable';

export default function LayersRenderComponent({
  notebooks,
  setnotebooks,
  id,
  currentPage,
  isEditMode,
  currentCopied,
  setcurrentCopied,
}) {
  const [updateForce, setupdateForce] = useState(1);

  const [showChartBox, setshowChartBox] = useState(false);
  const [showDrawBox, setshowDrawBox] = useState(false);
  const [showCodeBox, setshowCodeBox] = useState(false);
  const [showShapeBox, setshowShapeBox] = useState(false);
  const [showTextBox, setshowTextBox] = useState(false);
  const [showTableBox, setshowTableBox] = useState(false);

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
      case 'table': {
        setshowTableBox(true);
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
    const handleDelete = () => {
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
    };
    //memory leak
    window.onkeydown = (e) => {
      if (isEditMode) {
        if (e.ctrlKey && e.code == 'KeyX') {
          console.log('cut');
          setcurrentCopied({
            page: currentPage,
            elementIndex: target.getAttribute('element_index'),
          });
          handleDelete();
        }
        if (e.ctrlKey && e.code == 'KeyC') {
          if (target != null) {
            console.log('Copy');
            setcurrentCopied({
              page: currentPage,
              elementIndex: target.getAttribute('element_index'),
            });
          }
        }
        if (e.ctrlKey && e.code == 'KeyV') {
          if (currentCopied != null) {
            console.log('paste');

            let elementToAdd = notebooks.find((item) => item.id == id).cards[
              currentCopied.page - 1
            ].elements[currentCopied.elementIndex];

            elementToAdd.frame.translate = [0, 0];
            elementToAdd.frame.rotate = 0;

            setnotebooks(
              notebooks.map((item1, index1) => {
                if (item1.id == id) {
                  item1.cards.map((item2, index2) => {
                    if (index2 + 1 == currentPage) {
                      item2.elements.push(elementToAdd);
                    }
                    return item2;
                  });
                }
                return item1;
              }),
            );
            setupdateForce(updateForce + 1);
          }
        }
        if (e.code == 'Delete') {
          console.log('delete');
          handleDelete();
        }
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
      {updateForce &&
        elements.map((element, index) => (
          <div
            className='target'
            element_index={index}
            key={index}
            style={{
              zIndex: index + 1,
              transform: `translate(${element.frame.translate[0]}px, ${element.frame.translate[1]}px ) rotate(${element.frame.rotate}deg) `,
              width: `${element.frame.width}px`,
              height: `${element.frame.height}px`,
            }}
            onClick={(e) => {
              if (isEditMode) {
                setTarget(e.currentTarget);
                setnumberOfElement(index);
              }
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
      <InsertDraw
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
      <InsertTable
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showTableBox}
        setshowBox={setshowTableBox}
        currentPage={currentPage}
        numberOfElement={numberOfElement}
        data={data}
      />
    </div>
  );
}
