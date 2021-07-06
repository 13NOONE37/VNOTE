import React, { useRef, useState } from 'react';

import CryptoJS from 'crypto-js';
import { createPortal } from 'react-dom';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';

import 'css/modals/modalConfig.css';
import 'css/modals/EncryptNote.css';
import handleContentChange from 'utils/Global/handleContentChange';

export default function EncryptNote({
  setnotes,
  notes,
  id,
  showEncryptModal,
  setshowEncryptModal,
  isSecretInit,
}) {
  const box = useRef(null);

  const encryptNote = () => {
    setnotes(
      notes.map((item) => {
        if (item.id == id) {
          item.isArchive = true;
          item.content = CryptoJS.AES.encrypt(item.content, password);
          // item.content = CryptoJS.AES.decrypt(
          //   item.content,
          //   password,
          // ).toString(CryptoJS.enc.Utf8);
        }
        return item;
      }),
    );
  };

  const [password, setpassword] = useState('');
  const handleSubmitEncrypt = (e) => {
    e.preventDefault();
  };

  return createPortal(
    <>
      {showEncryptModal && (
        <div
          ref={box}
          className='modalBox'
          onMouseDown={(e) => {
            handleClickOutside(e, box, setshowEncryptModal);
          }}
        >
          <div className='EncryptBox'>
            <span className='titleSection'>
              {isSecretInit
                ? 'Set password for your secrets'
                : 'Type secret password'}
            </span>

            <span className='decryptSpan'>
              <form onSubmit={handleSubmitEncrypt}>
                <input
                  type='password'
                  placeholder='Type password'
                  value={password}
                  onChange={(e) => handleContentChange(e, setpassword)}
                />
                <button type='submit' className='decryptButton'>
                  <i className='fas fa-fingerprint'></i>
                </button>
              </form>
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
