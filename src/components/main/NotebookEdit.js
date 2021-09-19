import React from 'react';
import ContentEditable from 'react-contenteditable';

import 'css/main/NotebookEdit.css';
import LayersRenderComponent from './LayersRenderComponent';
import handleContentChange from 'utils/Global/handleContentChange';

function NotebookEdit({ notebooks, setnotebooks, id, currentPage }) {
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
                        disabled={false}
                        onChange={handleChangeTitle}
                        tagName={'span'}
                      />
                      :
                      <ContentEditable
                        className={`titleEditable`}
                        html={page.titleOfPage}
                        disabled={false}
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
/*
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
          <span className='topMargin'>
            <span className='pageTitle'>
              <ContentEditable
                className={`titleEditable`}
                html={notebook.title}
                disabled={false}
                onChange={handleChangeTitle}
                tagName={'span'}
              />
              :
              <ContentEditable
                className={`titleEditable`}
                html={notebook.cards[currentPage - 1].titleOfPage}
                disabled={false}
                onChange={handleChangeSubTitle}
                tagName={'span'}
              />
            </span>
            <span className='pageDate'>
              {notebook.cards[currentPage - 1].date}
            </span>
          </span>
          <span className={`content ${notebook.paperType}`}>
            <LayersRenderComponent
              notebooks={notebooks}
              setnotebooks={setnotebooks}
              id={id}
              currentPage={currentPage}
            />
          </span>
          <span className='bottomMargin'>
            <span className='PageCount'>{currentPage}</span>
          </span>
        </div>
      ),
  );
}
*/
