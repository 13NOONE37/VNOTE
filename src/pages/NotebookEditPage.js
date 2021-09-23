import React, { useContext, useState } from 'react';
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

  const [currentPage, setcurrentPage] = useState(1);

  return (
    <div className='notebookPage scrollClass'>
      <NotebookSideActions
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        currentPage={currentPage}
        setcurrentPage={setcurrentPage}
      />
      <main>
        <NotebookEdit
          notebooks={notebooks}
          setnotebooks={setnotebooks}
          id={id}
          currentPage={currentPage}
        />
        <ControPageCount
          notebooks={notebooks}
          setnotebooks={setnotebooks}
          id={id}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
        />
      </main>
    </div>
  );
}
