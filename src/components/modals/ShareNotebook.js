import React, { useRef, useState } from 'react';
import 'css/modals/ShareNote.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

export default function ShareNotebook({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const link = useRef(null);
  const box = useRef(null);
  const [linkState, setlinkState] = useState({
    isCopied: false,
    value: `https:/vdesk.cu.ma/apps/vnote/shared/generatedLink`,
  });

  const handleCopyLink = () => {
    window.getSelection().selectAllChildren(link.current);
    document.execCommand('copy');

    setlinkState({ isCopied: true, value: linkState.value });

    window.getSelection().removeAllRanges();
    setTimeout(() => {
      setlinkState({ isCopied: false, value: linkState.value });
    }, 4000);
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
          <div className='shareBox '>
            <a className='scrollClass' ref={link} href={linkState.value}>
              {linkState.isCopied ? 'Copied' : linkState.value}
            </a>
            <button aria-label='Copy link' onClick={handleCopyLink}>
              <i className='far fa-copy'></i>
            </button>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
