import React from 'react';
import 'css/main/NotebookEdit.css';
import MoveableComponent from 'components/modals/MoveableComponent';

function NotebookEdit({ notebooks, setnotebooks, id }) {
  return notebooks.map(
    (notebook, index) =>
      notebook.id == id && (
        <div
          className='notebookEdit'
          style={{
            backgroundColor: `hsl(${notebook.paperColor}deg, 30%, 45%)`,
          }}
        >
          <MoveableComponent />

          <span className='topMargin'>
            <span className='pageTitle'>{`${notebook.title}: Destrukturyzacja`}</span>
            <span className='pageDate'>25.05.1410</span>
          </span>
          <span
            className={`content ${notebook.paperType}`}
            contentEditable='true'
            suppressContentEditableWarning={true}
          >
            <b>Szczury</b> <br /> Pewnego dnia przybył szczur do wioski i rzekł
            Szczury to koxy.
          </span>
          <span className='bottomMargin'>
            <span className='PageCount'>54</span>
          </span>
        </div>
      ),
  );
}

export default NotebookEdit;
