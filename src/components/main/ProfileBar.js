import 'css/main/ProfileBar.css';

import React, { useState } from 'react';
import SignOut from 'utils/AccountFunctions/SignOut.js';

export default function ProfileBar() {
  const [currentPos, setcurrentPos] = useState(154);

  const handleMoveIndicator = (e) => {
    setcurrentPos(e.currentTarget.offsetTop);
  };

  return (
    <div className='ProfileBar'>
      <span className='indicator' style={{ top: `${currentPos}px` }}></span>
      <button onMouseEnter={handleMoveIndicator}>
        <i className='fas fa-sign-out-alt'></i>
      </button>
      <button onMouseEnter={handleMoveIndicator}>
        <i className='fas fa-cog'></i>
      </button>
      <button onMouseEnter={handleMoveIndicator}>
        <i className='fas fa-user'></i>
      </button>
    </div>
  );
}
