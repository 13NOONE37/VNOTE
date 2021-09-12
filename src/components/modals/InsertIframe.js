import React, { useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertIframe.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import handleContentChange from 'utils/Global/handleContentChange';
import ExampleGif from 'resources/iframe.gif';

export default function InsertIframe({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
  currentPage,
}) {
  const box = useRef(null);
  const [currentIframe, setcurrentIframe] = useState(null);
  const handleSubmit = () => {
    if (currentIframe) {
      let temp = currentIframe;
      temp = temp.replace(
        'width',
        `style="width:100% !important; height:100% !important" width`,
      );

      setnotebooks(
        notebooks.map((item1, index1) => {
          if (item1.id == id) {
            item1.cards.map((item2, index2) => {
              if (index2 + 1 == currentPage) {
                item2.elements.push({
                  type: 'iframe',
                  frame: {
                    translate: [0, 0],
                    rotate: 0,
                  },
                  value: (
                    <div
                      style={{
                        border: '5px solid #333',
                        width: '100%',
                        height: '100%',
                        padding: '0',
                        margin: '0',
                      }}
                      className='iframeBox'
                      dangerouslySetInnerHTML={{ __html: temp }}
                    ></div>
                  ),
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
  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='imageBox'>
            <div className='topBar'>
              <span>Add iframe</span>
            </div>
            <div className='embedField scrollClass'>
              <input
                className='embedInput'
                type='text'
                placeholder='Paste embed code'
                value={currentIframe}
                onChange={(e) => handleContentChange(e, setcurrentIframe)}
              />
              {currentIframe && (
                <div
                  className='iframeBox'
                  dangerouslySetInnerHTML={{ __html: currentIframe }}
                ></div>
              )}
              <span>Example</span>
              <img src={ExampleGif} />
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
