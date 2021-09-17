import React from 'react';
import 'css/main/NotebookEdit.css';
import LayersRenderComponent from './LayersRenderComponent';
import handleContentChange from 'utils/Global/handleContentChange';

function NotebookEdit({ notebooks, setnotebooks, id, currentPage }) {
  const handleChangeTitle = (e) => {
    setnotebooks(
      notebooks.map((item, index) => {
        if (item.id === id) {
          item.title = e.target.value;
        }
        return item;
      }),
    );
  };
  const handleChangeSubTitle = (e) => {
    setnotebooks(
      notebooks.map((item, index) => {
        if (item.id === id) {
          item.cards.map((page, pageIndex) => {
            if (pageIndex + 1 == currentPage) {
              page.titleOfPage = e.target.value;
            }

            return page;
          });
        }

        return item;
      }),
    );
  };

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
                    <span className='pageTitle'>
                      <input
                        type='text'
                        value={notebook.title}
                        onChange={handleChangeTitle}
                      />
                      <input
                        type='text'
                        value={page.titleOfPage}
                        onChange={handleChangeSubTitle}
                      />
                    </span>
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
