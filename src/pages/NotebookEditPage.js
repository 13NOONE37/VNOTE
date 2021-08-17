import React, { useContext } from 'react';
import { useParams } from 'react-router';
import AppContext from 'store/appContext';
import 'css/main/notebookPage.css';
import 'css/main/SideBar.css';
import ControPageCount from 'components/main/ControPageCount';
import NotebookSideActions from 'components/main/NotebookSideActions';
import NotebookEdit from 'components/main/NotebookEdit';

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
      <NotebookSideActions
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
      />
      <main>
        <NotebookEdit
          notebooks={notebooks}
          setnotebooks={setnotebooks}
          id={id}
        />
        <ControPageCount />
      </main>
    </div>
  );
}
