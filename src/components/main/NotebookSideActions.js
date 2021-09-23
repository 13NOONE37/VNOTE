import React, { useEffect, useState } from 'react';
import 'css/main/NotebookSideActions.css';
import { ReactComponent as VNoteLogo } from 'resources/SVG/logo.svg';
import { NavLink } from 'react-router-dom';
import ShareNotebook from 'components/modals/ShareNotebook';
import DrawNotebook from 'components/modals/DrawNotebook';
import TogglePaper from 'components/modals/TogglePaper';
import InsertImage from 'components/modals/InsertImage';
import InsertShape from 'components/modals/InsertShape';
import InsertChart from 'components/modals/InsertChart';
import InsertIframe from 'components/modals/InsertIframe';
import InsertCode from 'components/modals/InsertCode';

function NotebookSideActions({
  notebooks,
  setnotebooks,
  id,
  currentPage,
  setcurrentPage,
}) {
  const [showImageBox, setshowImageBox] = useState(false);
  const [showShapeBox, setshowShapeBox] = useState(false);
  const [showChartBox, setshowChartBox] = useState(false);
  const [showDrawBox, setshowDrawBox] = useState(false);
  const [showIframeBox, setshowIframeBox] = useState(false);
  const [showCodeBox, setshowCodeBox] = useState(false);
  const [showPaperBox, setshowPaperBox] = useState(false);
  const [showShareBox, setshowShareBox] = useState(false);
  const [showPrintBox, setshowPrintBox] = useState(false);

  const handleToggleView = () => console.log('Toogle view');
  const handleInsertImage = () => setshowImageBox(true);
  const handleInsertShape = () => setshowShapeBox(true);
  const handleInsertChart = () => setshowChartBox(true);
  const handleDrawNotebook = () => setshowDrawBox(true);
  const handleInsertIframe = () => setshowIframeBox(true);
  const handleCodeBox = () => setshowCodeBox(true);
  const handleChooseTypeOfPaper = () => setshowPaperBox(true);
  const handlePrintNotebook = () => {
    alert(
      'przygotować strone w css do druku(ukryć wszyskie elementy poza contentem oraz skolejkować wszyskie strony',
    );
    window.print();
  };
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
      action: handleCodeBox,
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
        notebooks.map((n) => {
          if (n.id == id) {
            n.isTableOfContentsCreated
              ? alert('already created')
              : setnotebooks(
                  notebooks.map((item, index) => {
                    if (item.id == id) {
                      item.isTableOfContentsCreated = true;
                      item.cards.unshift({
                        date: '',
                        titleOfPage: 'Table of Contents',
                        elements: [
                          {
                            type: 'image',
                            frame: {
                              translate: [0, 0],
                              rotate: 0,
                              width: null,
                              height: null,
                            },
                            value: (
                              <div id='toc_container'>
                                <p class='toc_title'>Contents</p>
                                <ul class='toc_list'>
                                  <li>
                                    <a href='#First_Point_Header'>
                                      1 First Point Header
                                    </a>
                                    <ul>
                                      <li>
                                        <a href='#First_Sub_Point_1'>
                                          1.1 First Sub Point 1
                                        </a>
                                      </li>
                                      <li>
                                        <a href='#First_Sub_Point_2'>
                                          1.2 First Sub Point 2
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <a href='#Second_Point_Header'>
                                      2 Second Point Header
                                    </a>
                                  </li>
                                  <li>
                                    <a href='#Third_Point_Header'>
                                      3 Third Point Header
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            ),
                          },
                        ],
                      });
                    }
                    return item;
                  }),
                );
          }
        });
        setcurrentPage(1);
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

      <InsertImage
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showImageBox}
        setshowBox={setshowImageBox}
        currentPage={currentPage}
      />
      <InsertShape
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showShapeBox}
        setshowBox={setshowShapeBox}
        currentPage={currentPage}
      />
      <InsertChart
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showChartBox}
        setshowBox={setshowChartBox}
        currentPage={currentPage}
      />
      <DrawNotebook
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showDrawBox}
        setshowBox={setshowDrawBox}
        currentPage={currentPage}
      />
      <InsertIframe
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showIframeBox}
        setshowBox={setshowIframeBox}
        currentPage={currentPage}
      />
      <InsertCode
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showCodeBox}
        setshowBox={setshowCodeBox}
        currentPage={currentPage}
      />

      <TogglePaper
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showPaperBox}
        setshowBox={setshowPaperBox}
        currentPage={currentPage}
      />
      <ShareNotebook
        notebooks={notebooks}
        setnotebooks={setnotebooks}
        id={id}
        showBox={showShareBox}
        setshowBox={setshowShareBox}
        currentPage={currentPage}
      />
    </aside>
  );
}

export default NotebookSideActions;
