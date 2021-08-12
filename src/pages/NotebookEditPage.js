import React, { useContext } from 'react';
import { useParams } from 'react-router';
import AppContext from 'store/appContext';
import 'css/main/notebookPage.css';
import 'css/main/SideBar.css';
import { ReactComponent as VNoteLogo } from 'resources/SVG/logo.svg';
import { NavLink } from 'react-router-dom';

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
      <header>
        <NavLink
          className='logoLink'
          activeClassName='logoLink'
          to='/'
          exact='true'
        >
          <VNoteLogo />
          <h1>VNote</h1>
        </NavLink>
      </header>
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
        <div>control panel</div>
      </main>
    </div>
  );
}
