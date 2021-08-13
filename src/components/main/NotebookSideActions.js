import React from 'react';
import 'css/main/NotebookSideActions.css';

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
  return (
    <aside className='sideNotebookActions'>
      {notebookSideActions.map((item, index) => (
        <button key={index} className='action'>
          <i className={item.icon}></i>
          <span>{item.name}</span>
        </button>
      ))}
    </aside>
  );
}

export default NotebookSideActions;
