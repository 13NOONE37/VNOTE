import React, { useRef, useState } from 'react';
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
  const uploadRef = useRef(null);
  const [uploadedImage, setuploadedImage] = useState('');

  const handleFileUpload = (data) => {
    const file = data[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        setuploadedImage(this.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.classList.add('dragOverClass');
  };
  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };
  const handleChange = (e) => {
    handleFileUpload(e.target.files);
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
              <button onClick={() => uploadRef.current.click()}>Upload</button>
              <button>URL</button>
              <button>Stock</button>
            </div>
            <div
              className='imagePreview'
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('dragOverClass');
              }}
            >
              {uploadedImage == '' ? (
                <UploadTemp />
              ) : (
                <img src={uploadedImage} />
              )}
              <input
                type='file'
                ref={uploadRef}
                accept='image/*'
                onChange={handleChange}
              />
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
