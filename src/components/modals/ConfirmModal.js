import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import 'css/modals/ConfirmModal.css';

export default function ConfirmModal({
  color,
  text,
  confirmAction,
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
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            handleClickOutside(e, box, setshowBox);
          }}
        >
          <div className='confirmBox'>
            <span>
              <h4>Are you sure?</h4>
              <p>{text}</p>
            </span>
            <span>
              <button
                onClick={() => setshowBox(!showBox)}
                className='cancelButton'
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundImage: `linear-gradient(0deg, var(--${
                    color || 'error'
                  }) 15%, transparent 0%)`,
                }}
                onClick={() => {
                  confirmAction();
                  setshowBox(!showBox);
                }}
                className='confirmButton'
              >
                Confirm
              </button>
            </span>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
