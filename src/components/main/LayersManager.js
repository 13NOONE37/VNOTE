import React from 'react';
import 'css/main/LayersManager.css';

export default function LayersManager({
  notebooks,
  setnotebooks,
  id,
  currentPage,
  isEditMode,
}) {
  return (
    <div className='LayersManager'>
      <button>
        <i className='fas fa-angle-up'></i>
      </button>
    </div>
  );
}
