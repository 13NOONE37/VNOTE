import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import AppContext from 'store/appContext';
import 'css/main/notebookPage.css';
import 'css/main/SideBar.css';

export default function NotebookEditPage() {
  const { id } = useParams();
  const [
    loggedIn,
    user,
    notes,
    setnotes,
    notebooks,
    setnotebooks,
    categoriesTable,
    setcategoriesTable,
  ] = useContext(AppContext);

  return (
    <div className='notebookPage scrollClass'>
      <aside>
        main actions{' '}
        <svg
          width='52'
          height='60'
          viewBox='0 0 52 60'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M26 0L51.9808 15V45L26 60L0.0192375 45V15L26 0Z'
            fill='#4071BF'
          />
        </svg>
      </aside>
      <main>
        <div>notebook</div>

        <div className='controlPageCount'>
          <button className='skewButton'>
            <i className='fas fa-backward'></i>
          </button>
          <button>
            <i className='fas fa-angle-left'></i>
          </button>
          <input type='number' min={0} />
          <button>
            <i className='fas fa-angle-right'></i>
          </button>
          <button className='skewButton'>
            <i className='fas fa-forward'></i>
          </button>
        </div>
      </main>
    </div>
  );
}
