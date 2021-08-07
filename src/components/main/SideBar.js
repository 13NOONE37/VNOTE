import 'css/main/SideBar.css';
import React, { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { ReactComponent as VNoteLogo } from 'resources/SVG/logo.svg';
import AppContext from 'store/appContext';
import ProfileBar from 'components/main/ProfileBar';
import AddCategory from 'components/modals/AddCategory';
import SearchModal from 'components/modals/SearchModal';

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

  const [showSearchModal, setshowSearchModal] = useState(false);
  const [showAddCategories, setshowAddCategories] = useState(false);
  const [showSideBar, setshowSideBar] = useState(false);

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
      // {
      //   name: 'Secrets',
      //   icon: 'fas fa-key',
      //   link: '/secrets',
      // },
      // {
      //   name: 'Shared',
      //   icon: 'fas fa-people-arrows',
      //   link: '/shared',
      // },
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
    <>
      <header className='header'>
        <button
          onClick={() => setshowSideBar(!showSideBar)}
          className='expandButton'
        >
          <i className='fas fa-bars'></i>
        </button>

        <NavLink
          className='logoLink'
          activeClassName='logoLink'
          to='/'
          exact='true'
        >
          <VNoteLogo />
          <h1>VNote</h1>
        </NavLink>

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
      </header>

      <aside
        className='SideBar'
        style={{ display: `${showSideBar ? 'grid' : 'none'}` }}
      >
        <AddCategory
          categoriesTable={categoriesTable}
          setcategoriesTable={setcategoriesTable}
          showAddCategories={showAddCategories}
          setshowAddCategories={setshowAddCategories}
        />
        <SearchModal
          showBox={showSearchModal}
          setshowBox={setshowSearchModal}
        />

        <div className='SideTop'>
          <NavLink
            className='logoLink'
            activeClassName='logoLink'
            to='/'
            exact='true'
          >
            <VNoteLogo />
            <h1>VNote</h1>
          </NavLink>
        </div>

        <div className='SideMiddle scrollClass'>
          <button
            className='searchButton'
            onClick={() => setshowSearchModal(!showSearchModal)}
          >
            <span>Search</span>
            <i className='fas fa-search'></i>
          </button>

          <button
            className='SideBarLinkItem editCategories'
            onClick={() => setshowAddCategories(!showAddCategories)}
          >
            <span>Edit categories</span>
            <i className='fas fa-wrench'></i>
          </button>

          {actionsTable.map((item, index) => {
            return (
              <NavLink
                key={index}
                className='SideBarLinkItem'
                activeClassName='SideBarLinkItem'
                to={item.link}
                exact='true'
              >
                <i className={item.icon} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

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
      </aside>
    </>
  );
}
