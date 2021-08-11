import React, { useContext } from 'react';
import { useParams } from 'react-router';
import AppContext from 'store/appContext';

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

  return <div className='mainPage scrollClass'>edit page</div>;
}
