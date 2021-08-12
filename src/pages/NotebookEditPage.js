import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import AppContext from 'store/appContext';
import 'css/main/notebookPage.css';
import 'css/main/SideBar.css';
import ControPageCount from 'components/main/ControPageCount';

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

  const notebookSideActions = [
    {
      name: 'Toogle View',
      icon: 'fas fa-eye',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert text',
      icon: 'fa-text-height',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert image',
      icon: 'fas fa-image',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert shape',
      icon: 'fas fa-shapes',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert chart',
      icon: 'fas fa-chart-pie',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Draw',
      icon: 'fas fa-pencil-alt',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert iframe',
      icon: 'fas fa-laptop-code',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert code',
      icon: 'fas fa-code',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Insert table',
      icon: 'fas fa-table',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Auto Table of Contents',
      icon: 'fas fa-th-list',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Type of paper',
      icon: 'fas fa-toilet-paper',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Print',
      icon: 'fas fa-print',
      action: () => {
        console.log('action executed');
      },
    },
    {
      name: 'Share',
      icon: 'fas fa-share',
      action: () => {
        console.log('action executed');
      },
    },
  ];
  return (
    <div className='notebookPage scrollClass'>
      <aside>
        {notebookSideActions.map((item, index) => (
          <div key={index}>
            <i className={item.icon}></i>
            <span>{item.name}</span>
          </div>
        ))}
        <svg
          width='52'
          height='60'
          viewBox='0 0 52 60'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M26 0L51.9808 15V45L26 60L0.0192375 45V15L26 0Z'
            fill='#4071BF'
          />
        </svg>
      </aside>
      <main>
        <div>notebook</div>

        <ControPageCount />
      </main>
    </div>
  );
}
