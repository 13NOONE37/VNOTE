import React, { useRef, useState } from 'react';
import 'css/modals/ShareNote.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';

export default function DrawNotebook({
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
          <div className='notebookEdit '>
            {/* Nowa Warstwa na stronie zeszytu którą można skalować a na niej
            rysujemy; Przy takim założeniu trzeba stworzyć system warstw których
            kolejność możnaby zmieniać na jakimś pasku po prawej; Trzeba też
            dodać opcje zwijania poszególnych pasków a nie tyko hide gui które
            jest realizowane poprzez 1 opcje na pasku */}
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
