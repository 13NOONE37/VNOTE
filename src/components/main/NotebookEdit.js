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
          {notebook.cards.map(
            (page, pageIndex) =>
              pageIndex + 1 == currentPage && (
                <>
                  <span className='topMargin'>
                    <span className='pageTitle'>{`${notebook.title}: ${page.titleOfPage}`}</span>
                    <span className='pageDate'>{page.date}</span>
                  </span>
                  <span className={`content ${notebook.paperType}`}>
                    <LayersRenderComponent
                      notebooks={notebooks}
                      setnotebooks={setnotebooks}
                      id={id}
                      currentPage={currentPage}
                    />
                  </span>
                </>
              ),
          )}
          <span className='bottomMargin'>
            <span className='PageCount'>{currentPage}</span>
          </span>
        </div>
      ),
  );
}

export default NotebookEdit;
