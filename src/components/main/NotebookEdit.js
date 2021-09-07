import React from 'react';
import 'css/main/NotebookEdit.css';
import LayersRenderComponent from './LayersRenderComponent';

function NotebookEdit({ notebooks, setnotebooks, id, currentPage }) {
  return notebooks.map(
    (notebook, index) =>
      notebook.id == id && (
        <div
          className='notebookEdit'
          style={{
            backgroundColor: `hsl(${notebook.paperColor}deg, 30%, 75%)`,
          }}
        >
          <span className='topMargin'>
            <span className='pageTitle'>{`${notebook.title}: Destrukturyzacja`}</span>
            <span className='pageDate'>25.05.1410</span>
          </span>
          <span
            className={`content ${notebook.paperType}`}
            // contentEditable='true'
            // suppressContentEditableWarning={true}
          >
            <LayersRenderComponent />
          </span>
          <span className='bottomMargin'>
            <span className='PageCount'>{currentPage}</span>
          </span>
        </div>
      ),
  );
}

export default NotebookEdit;
