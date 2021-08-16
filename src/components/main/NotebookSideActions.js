import React, { useState } from 'react';
import 'css/main/NotebookSideActions.css';
import { ReactComponent as VNoteLogo } from 'resources/SVG/logo.svg';
import { NavLink } from 'react-router-dom';
import ShareNotebook from 'components/modals/ShareNotebook';
import PrintNotebook from 'components/modals/PrintNotebook';
import DrawNotebook from 'components/modals/DrawNotebook';
import TogglePaper from 'components/modals/TogglePaper';

function NotebookSideActions({ notebooks, setnotebooks, id }) {
  const [showImageBox, setshowImageBox] = useState(false);
  const [showShapeBox, setshowShapeBox] = useState(false);
  const [showChartBox, setshowChartBox] = useState(false);
  const [showDrawBox, setshowDrawBox] = useState(false);
  const [showIframeBox, setshowIframeBox] = useState(false);
  const [showPaperBox, setshowPaperBox] = useState(false);
  const [showShareBox, setshowShareBox] = useState(false);
  const [showPrintBox, setshowPrintBox] = useState(false);

  const handleToggleView = () => console.log('Toogle view');
  const handleInsertImage = () => setshowImageBox(true);
  const handleInsertShape = () => setshowShapeBox(true);
  const handleInsertChart = () => setshowChartBox(true);
  const handleDrawNotebook = () => setshowDrawBox(true);
  const handleInsertIframe = () => setshowIframeBox(true);
  const handleChooseTypeOfPaper = () => setshowPaperBox(true);
  const handlePrintNotebook = () => setshowPrintBox(true);
  const handleShareNotebook = () => setshowShareBox(true);

  const notebookSideActions = [
    {
      name: 'Toogle View',
      icon: 'fas fa-eye',
      action: handleToggleView,
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
      action: handleInsertImage,
    },
    {
      name: 'Insert shape',
      icon: 'fas fa-shapes',
      action: handleInsertShape,
    },
    {
      name: 'Insert chart',
      icon: 'fas fa-chart-pie',
      action: handleInsertChart,
    },
    {
      name: 'Draw',
      icon: 'fas fa-pencil-alt',
      action: handleDrawNotebook,
    },
    {
      name: 'Insert iframe',
      icon: 'fas fa-laptop-code',
      action: handleInsertIframe,
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
      action: handleChooseTypeOfPaper,
    },
    {
      name: 'Print',
      icon: 'fas fa-print',
      action: handlePrintNotebook,
    },
    {
      name: 'Share',
      icon: 'fas fa-share',
      action: handleShareNotebook,
    },
  ];

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
          <button key={index} className='action' onClick={() => item.action()}>
            <i className={item.icon}></i>
            <span className='sideNotebookTooltip'>{item.name}</span>
          </button>
        ))}
      </span>

      <DrawNotebook
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showDrawBox}
        setshowBox={setshowDrawBox}
      />
      <TogglePaper
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showPaperBox}
        setshowBox={setshowPaperBox}
      />
      <PrintNotebook
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showPrintBox}
        setshowBox={setshowPrintBox}
      />
      <ShareNotebook
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showShareBox}
        setshowBox={setshowShareBox}
      />
    </aside>
  );
}

export default NotebookSideActions;
