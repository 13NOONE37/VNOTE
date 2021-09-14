import React, { useRef, useState } from 'react';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertChart.css';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import {
  Doughnut,
  Bar,
  PolarArea,
  Line,
  Radar,
  Pie,
  Scatter,
} from 'react-chartjs-2';
import handleContentChange from 'utils/Global/handleContentChange';
import ChartTemplate from 'components/main/ChartTemplate';

export default function InsertChart({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
  currentPage,
}) {
  const box = useRef(null);

  const chartTypes = ['line', 'radar', 'polar', 'pie', 'doughtnut', 'bar'];
  const [currentChartType, setcurrentChartType] = useState(5);
  const [currentTitle, setcurrentTitle] = useState('');
  const [currentLabel, setcurrentLabel] = useState('');

  const [chartValues, setchartValues] = useState([
    {
      name: '',
      value: '',
    },
  ]);

  const data = {
    labels: chartValues.map((item) => item.name),
    datasets: [
      {
        label: currentLabel,
        data: chartValues.map((item) => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleChangeChart = (isLeft) => {
    if (isLeft) {
      currentChartType <= 0
        ? setcurrentChartType(5)
        : setcurrentChartType(currentChartType - 1);
    } else {
      currentChartType >= 5
        ? setcurrentChartType(0)
        : setcurrentChartType(currentChartType + 1);
    }
  };
  const handleAddEmpty = () => {
    const temp = [...chartValues];
    temp.push({
      name: '',
      value: '',
    });
    setchartValues(temp);
  };
  const handleSubmitDataset = (e, index) => {
    e.preventDefault();
    let temp = [...chartValues];
    temp.splice(index + 1, 0, { name: '', value: '' });
    setchartValues(temp);
  };
  const handleChangeName = (e, index) => {
    setchartValues(
      chartValues.map((item, n) => {
        if (index == n) {
          item.name = e.target.value;
        }
        return item;
      }),
    );
  };
  const handleChangeValue = (e, index) => {
    setchartValues(
      chartValues.map((item, n) => {
        if (index == n) {
          item.value = e.target.value;
        }
        return item;
      }),
    );
  };
  const handleDeleteDataset = (index) => {
    console.log('deleteing dataset');
    setchartValues(chartValues.filter((item, n) => n != index));
  };
  const handleSubmit = () => {
    if (chartValues.length > 1) {
      setnotebooks(
        notebooks.map((item1, index1) => {
          if (item1.id == id) {
            item1.cards.map((item2, index2) => {
              if (index2 + 1 == currentPage) {
                item2.elements.push({
                  type: 'chart',
                  frame: {
                    translate: [0, 0],
                    rotate: 0,
                  },
                  value: (
                    <div
                      style={{
                        background: '#f8f8ff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px',
                      }}
                    >
                      <h1 style={{ color: '#333', marginBottom: '15px' }}>
                        {currentTitle}
                      </h1>
                      <ChartTemplate data={data} type={currentChartType} />
                    </div>
                  ),
                });
              }
              return item2;
            });
          }
          return item1;
        }),
      );
      setshowBox(false);
    }
  };

  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox '
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='imageBox'>
            <div className='topBar'>
              <span>Enter data</span>
            </div>
            <div className='chartPreview scrollClass'>
              <input
                type='text'
                placeholder='Chart Title'
                className='titleInput'
                value={currentTitle}
                onChange={(e) => handleContentChange(e, setcurrentTitle)}
              />
              <input
                type='text'
                placeholder='Set label'
                className='titleInput'
                value={currentLabel}
                onChange={(e) => handleContentChange(e, setcurrentLabel)}
              />
              <h1>Change chart type</h1>
              <span className='changeChartType'>
                <button onClick={() => handleChangeChart(true)}>
                  <i className='fas fa-angle-left'></i>
                </button>
                <button onClick={() => handleChangeChart(false)}>
                  <i className='fas fa-angle-right'></i>
                </button>
              </span>
              <div className='chartTypes scrollClass'>
                <ChartTemplate data={data} type={currentChartType} />
              </div>
              <h1>Data:</h1>
              <div className='dataField scrollClass'>
                {chartValues.map((item, index) => (
                  <form
                    className='dataset'
                    key={index}
                    onSubmit={(e) => handleSubmitDataset(e, index)}
                  >
                    <input
                      type='text'
                      className='item'
                      placeholder='Name...'
                      p
                      value={item.name}
                      onChange={(e) => {
                        handleChangeName(e, index);
                      }}
                    />
                    <input
                      type='text'
                      className='value'
                      placeholder='Value...'
                      value={item.value}
                      onChange={(e) => {
                        handleChangeValue(e, index);
                      }}
                    />
                    <button
                      type='button'
                      className='deleteData'
                      onClick={() => handleDeleteDataset(index)}
                    >
                      <i className='far fa-trash-alt'></i>
                    </button>
                    <button type='submit' style={{ display: 'none' }}></button>
                  </form>
                ))}

                <button className='newData' onClick={handleAddEmpty}>
                  <i className='fas fa-plus'></i>
                  <span>Add new</span>
                </button>
              </div>
            </div>
            <div className='bottomBar'>
              <button
                onClick={() => {
                  setshowBox(false);
                }}
              >
                Cancel
              </button>
              <button onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
