import 'css/main/ProfileBar.css';

import React, { useEffect, useRef, useState } from 'react';
import SignOut from 'utils/AccountFunctions/SignOut.js';

export default function ProfileBar({
  notes,
  setnotes,
  notebooks,
  setnotebooks,
  categoriesTable,
  setcategoriesTable,
}) {
  const [currentPos, setcurrentPos] = useState(154);
  const handleMoveIndicator = (e) => {
    setcurrentPos(e.currentTarget.offsetTop);
  };

  const [downloadHref, setdownloadHref] = useState('');
  const handlePrepareJson = async () => {
    const backup = { notes, notebooks, categoriesTable };
    const json = JSON.stringify(backup);
    console.log(json.length);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    setdownloadHref(href);
  };

  const fileInput = useRef(null);
  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    let result;
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        if (
          window.confirm('Arey you sure? It will overwrite all your profil.')
        ) {
          const myObj = JSON.parse(this.result);

          if (myObj.notes) {
            setnotes(myObj.notes);
          }
          if (myObj.notebooks) {
            setnotebooks(myObj.notebooks);
          }
          if (myObj.categoriesTable) {
            setcategoriesTable(myObj.categoriesTable);
          }

          console.log(
            myObj,
            myObj.notes ? 'true' : 'false',
            myObj.notebooks ? 'true' : 'false',
            myObj.categoriesTable ? 'true' : 'false',
          );
        } else {
        }
      });
      reader.readAsText(file);
    }
  };

  return (
    <div className='ProfileBar' onClick={handlePrepareJson}>
      <span className='indicator' style={{ top: `${currentPos}px` }}></span>
      <button onMouseEnter={handleMoveIndicator} onClick={() => SignOut()}>
        <i className='fas fa-sign-out-alt'></i>
      </button>
      <button onMouseEnter={handleMoveIndicator}>
        <i className='fas fa-cog'></i>
      </button>
      <button onMouseEnter={handleMoveIndicator}>
        <i className='fas fa-user'></i>
      </button>
      <a
        download='VnoteBackup.json'
        href={downloadHref}
        onMouseEnter={handleMoveIndicator}
      >
        <i className='fas fa-download'></i>
      </a>
      <button
        onMouseEnter={handleMoveIndicator}
        onClick={(e) => {
          fileInput.current.click();
        }}
      >
        <i className='fas fa-upload'></i>
        <input
          ref={fileInput}
          type='file'
          onChange={handleUploadFile}
          style={{ display: 'none', visibility: 'hidden' }}
          accept='application/json'
        />
      </button>
    </div>
  );
}
