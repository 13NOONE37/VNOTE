import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import AppContext from 'store/appContext';
import 'css/main/notebookPage.css';
import 'css/main/SideBar.css';
import ControPageCount from 'components/main/ControPageCount';
import NotebookSideActions from 'components/main/NotebookSideActions';

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
      <NotebookSideActions />
      <main>
        <div>notebook</div>

        <ControPageCount />
      </main>
    </div>
  );
}
