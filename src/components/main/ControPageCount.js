import React, { useState } from 'react';
import 'css/main/ControlPageCount.css';

function ControPageCount({ notebooks, id, currentPage, setcurrentPage }) {
  const [lengthOfNotebook, setlengthOfNotebook] = useState(
    notebooks.find((item) => item.id == id).cards.length,
  );

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
        max={lengthOfNotebook}
        placeholder='0-99'
        value={currentPage}
        onChange={(e) =>
          setcurrentPage(
            Math.min(Math.max(1, e.target.value), lengthOfNotebook),
          )
        }
      />
      <button
        onClick={() =>
          setcurrentPage(Math.min(currentPage + 1, lengthOfNotebook))
        }
      >
        <i className='fas fa-angle-right'></i>
      </button>
      <button
        className='skewButton'
        onClick={() => setcurrentPage(lengthOfNotebook)}
      >
        <i className='fas fa-forward'></i>
      </button>
    </div>
  );
}

export default ControPageCount;
