import React from 'react';

export default function ItemsGalery({ type1, type2 }) {
  return (
    <div className='ItemsGallery'>
      <Note type={type1} />
      {type2 && <Note type={type2} />}
    </div>
  );
}
