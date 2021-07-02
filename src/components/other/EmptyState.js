import React from 'react';
import { ReactComponent as Friderich } from 'resources/Friderich.svg';
import 'css/other/EmptyState.css';

export default function EmptyState() {
  return (
    <div className='EmptyState'>
      <span>There are not notes here</span>
      <div>
        <Friderich />
        <q>
          If you look long enough into the void the void begins to look back
          through you
        </q>
      </div>
    </div>
  );
}
