import React from 'react';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

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
];
