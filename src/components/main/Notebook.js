import React, { useEffect, useState } from 'react';

import NotebookTools from 'components/main/NotebookTools';

import 'css/main/Notebook.css';
import Masonry from 'react-masonry-css';

export default function Notebook({ notebookssArray, setnotebooksArray }) {
  const breakpointColumnsObj = {
    default: 5,
    1550: 4,
    1290: 3,
    1035: 2,
    784: 1,
    660: 2,
    530: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {notesArray.map((item, index) => {
        return (
          handleTypeDecide(
            item.isPinned,
            item.isDeleted,
            item.isArchive,
            item.isShared,
            item.isSecret,
            item.groups,
            renderType,
            categoryTypeHere,
          ) && (
            <div
              key={index}
              tabIndex={index}
              onClick={(e) => {
                console.log('redirect to notebook editor');
              }}
              key={index}
              className='notebook'
              style={{
                backgroundImage: `linear-gradient(45deg, hsl(${item.color},45%,14%), hsl(${item.color},45%,20%))`,
              }}
            >
              <NotebookTools item={item} />
            </div>
          )
        );
      })}
    </Masonry>
  );
}
