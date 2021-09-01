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
}) {
  const box = useRef(null);
  const [currentIframe, setcurrentIframe] = useState(null);

  const handleSubmit = () => {
    if (currentIframe) {
      console.log(currentIframe);
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
