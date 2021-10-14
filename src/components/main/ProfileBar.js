import 'css/main/ProfileBar.css';

import React, { useEffect, useState } from 'react';
import SignOut from 'utils/AccountFunctions/SignOut.js';

export default function ProfileBar({ notes, notebooks, categoriesTable }) {
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
    </div>
  );
}
