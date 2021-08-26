import React, { useRef, useState } from 'react';
import Moveable from 'react-moveable';

import 'css/modals/ShowBasicEditBox.css';

export default function ShowBasicEditBox({ targetRef }) {
  const box = useRef(null);
  const BasicEditBox = useRef(null);

  return (
    <div ref={box} className='modalBox modalNoBackdrop'>
      <div className={`BasicEditBox`} ref={BasicEditBox}>
        <button className='lt'>Left-top</button>
        <button className='lb'>Left-bottom</button>
        <button className='rt'>Right-top</button>
        <button className='rb'>Right-bottom</button>
        <button className='rotate'>$Rotate</button>
      </div>
    </div>
  );
}
