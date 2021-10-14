import React, { useEffect, useState } from 'react';

import NotebookTools from 'components/main/NotebookTools';

import 'css/main/Notebook.css';
import 'css/other/noteBackgrounds.css';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router';

export default function Notebook({
  notebooks,
  setnotebooks,
  isNewNotebook,
  setisNewNotebook,
}) {
  const history = useHistory();

  const redirectToEdit = (id) => history.push(`/notebooks/edit/${id}`);

  const breakpointColumnsObj = {
    default: 5,
    1550: 4,
    1290: 3,
    1035: 2,
    784: 1,
    660: 2,
    530: 1,
  };

  useEffect(() => {
    if (isNewNotebook) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const temp = notebooks;

      const newId = parseInt(
        `${Date.now()}${Math.floor(Math.random() * 100)}${
          (Date.now() / Math.random()) * 3
        }`,
      );
      temp.unshift({
        id: newId,
        title: 'Your notebook',
        color: 75,
        bgImage: 'hexagons',
        paperType: 'linePaper',
        paperColor: 75,
        cards: [
          {
            date: `${day}.${month > 9 ? month : `0${month}`}.${year}`,
            titleOfPage: 'Title of Page',
            elements: [],
          },
        ],
      });

      setnotebooks(temp);
      setisNewNotebook(false);
    }
  }, [isNewNotebook]);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {notebooks.map((item, index) => (
        <div
          key={index}
          // tabIndex={index}
          onDoubleClick={() => redirectToEdit(item.id)}
          key={index}
          className={`notebook ${item.bgImage}`}
          style={{
            backgroundColor: `hsl(${item.color},45%,10%)`,
          }}
        >
          <div className='notebookInfo'>
            <span className='title'>{item.title}</span>
          </div>
          <NotebookTools item={item} redirectToEdit={redirectToEdit} />
        </div>
      ))}
    </Masonry>
  );
}
