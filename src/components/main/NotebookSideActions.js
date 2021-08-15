import React from 'react';
import 'css/main/NotebookSideActions.css';
import { ReactComponent as VNoteLogo } from 'resources/SVG/logo.svg';
import { NavLink } from 'react-router-dom';

function NotebookSideActions() {
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
      icon: 'fas fa-text-height',
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

  const handleToggleView = () => {
    console.log('Toogle view');
  };

  return (
    <aside className='sideNotebook'>
      <span>
        <NavLink
          className='logoLink'
          activeClassName='logoLink'
          to='/'
          exact='true'
        >
          <VNoteLogo style={{ width: '40px', marginBottom: '30px' }} />
        </NavLink>
      </span>

      <span className='sideNotebookActions'>
        {notebookSideActions.map((item, index) => (
          <button key={index} className='action'>
            <i className={item.icon}></i>
            <span className='sideNotebookTooltip'>{item.name}</span>
          </button>
        ))}
      </span>
    </aside>
  );
}

export default NotebookSideActions;
