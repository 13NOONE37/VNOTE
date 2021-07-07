import React, { useEffect, useState } from 'react';
import 'css/other/notify.css';

import ProgressCicle from './ProgressCircle';
export default function Notify({ notifyType, notifyContent, notifyTime }) {
  const [leftTime, setleftTime] = useState(
    notifyTime <= 100 ? notifyTime : 100,
  );
  const [showDiv, setshowDiv] = useState(true);
  const handleHideNotify = () => setleftTime(-1);

  useEffect(() => {
    if (leftTime >= 0) {
      const timeout = setTimeout(() => {
        setleftTime(leftTime - 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [leftTime]);

  return (
    showDiv && (
      <div
        className={`notify notify${notifyType} ${
          leftTime > 0 ? 'showNotify' : 'hideNotify'
        }`}
        onAnimationEnd={() => {
          if (leftTime <= 0) {
            setshowDiv(false);
          }
        }}
      >
        <span className='scrollClass'>{notifyContent}</span>
        <div className='closeButton'>
          <button onClick={handleHideNotify}>
            <i className='fas fa-times'></i>
          </button>
          <ProgressCicle leftTime={leftTime} />
        </div>
      </div>
    )
  );
}
