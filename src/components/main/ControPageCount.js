import React from 'react';
import 'css/main/ControlPageCount.css';

function ControPageCount() {
  return (
    <div className='controlPageCount'>
      <button className='skewButton'>
        <i className='fas fa-backward'></i>
      </button>
      <button>
        <i className='fas fa-angle-left'></i>
      </button>
      <input type='number' min={0} placeholder='0-99' />
      <button>
        <i className='fas fa-angle-right'></i>
      </button>
      <button className='skewButton'>
        <i className='fas fa-forward'></i>
      </button>
    </div>
  );
}

export default ControPageCount;
