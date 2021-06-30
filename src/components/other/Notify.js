import React, { useEffect, useState } from 'react';
import 'css/other/notify.css';

import ProgressCicle from './ProgressCircle';
export default function Notify({ notifyType, notifyContent, notifyTime }) {
  const [leftTime, setleftTime] = useState(
    notifyTime <= 100 ? notifyTime : 100,
  );

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
    leftTime > 0 && (
      <div className={`notify notify${notifyType}`}>
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
