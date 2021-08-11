import React from 'react';

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import NotesPage from './NotesPage';
import NotebooksPage from './NotebooksPage';
import SecretPage from './SecretPage';
import SharePage from './SharePage';
import ArchivePage from './ArchivePage';
import TrashPage from './TrashPage';
import CategoryPage from './CategoryPage';
import NotebookEditPage from './NotebookEditPage';

export default [
  {
    path: '/',
    exact: true,
    component: () => <MainPage />,
    protected: 'auth',
  },
  {
    path: '/authentication',
    component: () => <LoginPage />,
    protected: 'guest',
  },
  {
    path: '/notes',
    component: () => <NotesPage />,
    protected: 'auth',
  },
  {
    path: '/notebooks',
    component: () => <NotebooksPage />,
    protected: 'auth',
  },
  {
    path: '/notebooks/edit/:id',
    component: () => <NotebookEditPage />,
    protected: 'auth',
  },
  // {
  //   path: '/secrets',
  //   component: () => <SecretPage />,
  //   protected: 'auth',
  // },
  // {
  //   path: '/shared',
  //   component: () => <SharePage />,
  //   protected: 'auth',
  // },
  {
    path: '/deleted',
    component: () => <TrashPage />,
    protected: 'auth',
  },
  {
    path: '/archive',
    component: () => <ArchivePage />,
    protected: 'auth',
  },
  {
    path: '/category/:id',
    component: () => <CategoryPage />,
    protected: 'auth',
  },
];
