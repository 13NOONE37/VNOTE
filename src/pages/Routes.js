import React from 'react';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import About from './About';
import VNotePage from './VnotePages/VNotePage';
import VNotePageNotes from './VnotePages/VNotePageNotes';
import VNotePageNotebooks from './VnotePages/VNotePageNotebooks';
import VNotePageSecrets from './VnotePages/VNotePageSecrets';
import VNotePageShared from './VnotePages/VNotePageShared';
import VNotePageDeleted from './VnotePages/VNotePageDeleted';
import VNotePageGroup from './VnotePages/VNotePageGroup';
import VNotePageArchive from './VnotePages/VNotePageArchive';
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
    path: '/about',
    component: () => <About />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote',
    component: () => <VNotePage />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/notes',
    component: () => <VNotePageNotes />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/notebooks',
    component: () => <VNotePageNotebooks />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/secrets',
    component: () => <VNotePageSecrets />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/shared',
    component: () => <VNotePageShared />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/deleted',
    component: () => <VNotePageDeleted />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/archive',
    component: () => <VNotePageArchive />,
    protected: 'auth',
  },
  {
    path: '/apps/vnote/category/:id',
    component: () => <VNotePageGroup />,
    protected: 'auth',
  },
];
