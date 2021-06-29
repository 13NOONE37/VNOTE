import 'css/main/SideBar.css';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as VNoteLogo } from 'resources/logo.svg';
import AppContext from 'store/appContext';
import ProfileBar from 'components/main/ProfileBar';

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

      <ul className='SideMiddle'>
        <button className='SideBarLinkItem editCategories'>
          <span>Edit categories</span>
          <i className='fas fa-wrench'></i>
        </button>

        {actionsTable.map((item, index) => {
          return (
            <NavLink
              key={index}
              className='SideBarLink'
              activeClassName='SideBarLink'
              to={item.link}
              exact='true'
            >
              <li className='SideBarLinkItem'>
                <i className={item.icon} />
                <span>{item.name}</span>
              </li>
            </NavLink>
          );
        })}
      </ul>

      <div className='SideBottom'>
        <button className='profileButton'>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt='Profile photo'
              title={user.displayName}
            />
          ) : (
            <i className='fas fa-user' title={user.displayName} />
          )}
          <ProfileBar />
        </button>
      </div>
    </div>
  );
}
