import React, { useEffect, useRef } from 'react';
import * as Macy from 'macy';

import Note from './Note';

export default function ItemsGallery({ notes, setnotes }) {
  const itemsGallery = useRef(null);
  useEffect(() => {
    const macy = new Macy({
      container: '.items',
      mobileFirst: true,
      columns: 2,
    });
  }, []);

  return (
    <div ref={itemsGallery} className='items'>
      <Note renderType='pinned' notesArray={notes} setnotesArray={setnotes} />
      <Note renderType='other' notesArray={notes} setnotesArray={setnotes} />
    </div>
  );
}
