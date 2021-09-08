import React from 'react';
import 'css/main/ControlPageCount.css';

function ControPageCount({ notebooks, id, currentPage, setcurrentPage }) {
  return (
    <div className='controlPageCount'>
      <button className='skewButton' onClick={() => setcurrentPage(1)}>
        <i className='fas fa-backward'></i>
      </button>
      <button onClick={() => setcurrentPage(Math.max(1, currentPage - 1))}>
        <i className='fas fa-angle-left'></i>
      </button>
      <input
        type='number'
        min={0}
        placeholder='0-99'
        value={currentPage}
        onChange={(e) => setcurrentPage(Math.max(1, e.target.value))}
      />
      <button onClick={() => setcurrentPage(currentPage + 1)}>
        <i className='fas fa-angle-right'></i>
      </button>
      <button
        className='skewButton'
        onClick={() =>
          setcurrentPage(notebooks.find((item) => item.id == id).cards.length)
        }
      >
        <i className='fas fa-forward'></i>
      </button>
    </div>
  );
}

export default ControPageCount;
