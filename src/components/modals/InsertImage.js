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
  const [showURLField, setshowURLField] = useState(false);
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
  const handleURL = (e) => {
    setuploadedImage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
              <button
                onClick={() => {
                  setshowURLField(false);
                }}
              >
                Upload
              </button>
              <button onClick={() => setshowURLField(true)}>URL</button>
            </div>
            <div
              className='imagePreview scrollClass'
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('dragOverClass');
              }}
            >
              {showURLField ? (
                <>
                  <input
                    type='text'
                    placeholder='Paste URL or Base64'
                    onLoad={(e) => e.currentTarget.focus()}
                  />
                  {uploadedImage != '' && (
                    <img src={uploadedImage} style={{ marginTop: '20px' }} />
                  )}
                </>
              ) : (
                <>
                  {uploadedImage == '' ? (
                    <>
                      <UploadTemp />
                      <span>Click or Drag and drop</span>
                    </>
                  ) : (
                    <img src={uploadedImage} />
                  )}
                </>
              )}
              <input
                type='file'
                ref={uploadRef}
                accept='image/*'
                onChange={handleChange}
              />
            </div>
            <div className='bottomBar'>
              <button
                onClick={() => {
                  setuploadedImage('');
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
