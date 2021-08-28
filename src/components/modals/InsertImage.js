import React, { useRef } from 'react';
import 'css/modals/InsertImage.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

import { ReactComponent as UploadTemp } from 'resources/SVG/uploadTemp.svg';

export default function InsertImage({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const box = useRef(null);

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
              <button>Upload</button>
              <button>URL</button>
              <button>Stock</button>
            </div>
            <div className='imagePreview'>
              <UploadTemp />
              <input type='file' />
            </div>
            <div className='bottomBar'>
              <button onClick={() => setshowBox(false)}>Cancel</button>
              <button>Add</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
