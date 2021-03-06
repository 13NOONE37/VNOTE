import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';

import 'css/main/NotebookEdit.css';
import LayersRenderComponent from './LayersRenderComponent';

function NotebookEdit({
  notebooks,
  setnotebooks,
  id,
  currentPage,
  isEditMode,
}) {
  const handleChangeTitle = (e) => {
    setnotebooks(
      notebooks.map((item, index) => {
        if (item.id == id) {
          item.title = e.target.value;
        }
        return item;
      }),
    );
  };
  const handleChangeSubTitle = (e) => {
    setnotebooks(
      notebooks.map((item, index) => {
        if (item.id == id) {
          item.cards.map((item2, index2) => {
            if (index2 + 1 == currentPage) {
              item2.titleOfPage = e.target.value;
            }
            return item2;
          });
        }
        return item;
      }),
    );
  };

  const [currentCopied, setcurrentCopied] = useState(null);

  return notebooks.map(
    (notebook, index) =>
      notebook.id == id && (
        <div
          key={index}
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
                      <ContentEditable
                        className={`titleEditable`}
                        html={notebook.title}
                        disabled={!isEditMode}
                        onChange={handleChangeTitle}
                        tagName={'span'}
                      />
                      :
                      <ContentEditable
                        className={`titleEditable`}
                        html={page.titleOfPage}
                        disabled={!isEditMode}
                        onChange={handleChangeSubTitle}
                        tagName={'span'}
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
                      isEditMode={isEditMode}
                      currentCopied={currentCopied}
                      setcurrentCopied={setcurrentCopied}
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
