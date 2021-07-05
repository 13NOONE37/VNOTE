import React from 'react';
import { ReactComponent as Friderich } from 'resources/SVG/Friderich.svg';
import 'css/other/EmptyState.css';

export default function EmptyState() {
  return (
    <div className='EmptyState'>
      <span>There are no notes here</span>
      <span>You can create a new one by clicking button at the top</span>
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
