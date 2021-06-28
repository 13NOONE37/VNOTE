import React, { useContext } from 'react';
import { ReactComponent as VNoteLogo } from 'resources/logo.svg';

import AppContext from 'store/AppContext';

export default function SideBar() {
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

  const actionsTable = [
    ...[
      {
        name: 'Notes',
        icon: 'far fa-sticky-note',
        link: '/notes',
      },
      {
        name: 'Notebooks',
        icon: 'fas fa-book',
        link: '/notebooks',
      },
      {
        name: 'Secrets',
        icon: 'fas fa-key',
        link: '/secrets',
      },
      {
        name: 'Shared',
        icon: 'fas fa-people-arrows',
        link: '/shared',
      },
      {
        name: 'Archive',
        icon: 'fas fa-archive',
        link: '/archive',
      },
      {
        name: 'Deleted',
        icon: 'fas fa-trash-alt',
        link: '/deleted',
      },
    ],
    ...categoriesTable,
  ];

  return (
    <div className='SideBar'>
      <div className='SideTop'>
        <span>
          <VNoteLogo />
          <h1>VNote</h1>
        </span>
        <input type='search' />
      </div>

      <div className='SideMiddle'>
        <button className='SideBarLinkItem editCategories'>
          <span>Edit categories</span>
          <i className='fas fa-wrench'></i>
        </button>

        <button className='SideBarLinkItem'>
          <i className='fas fa-wrench'></i>
          <span>Edit categories</span>
        </button>
      </div>

      <div className='SideBottom'></div>
    </div>
  );
}
