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
  Bubble,
  Pie,
  Scatter,
} from 'react-chartjs-2';
import handleContentChange from 'utils/Global/handleContentChange';

export default function InsertChart({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
}) {
  const box = useRef(null);

  const [currentTitle, setcurrentTitle] = useState('');
  const [currentLabel, setcurrentLabel] = useState('');
  const [chartValues, setchartValues] = useState([
    {
      name: '',
      value: '',
    },
  ]);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: currentLabel,
        data: [12, 19, 3, 5, 2, 3],
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

  const [currentNameOfDataset, setcurrentNameOfDataset] = useState('');
  const [currentValueOfDataset, setcurrentValueOfDataset] = useState('');

  const handleAddEmpty = () => {
    const temp = [...chartValues];
    temp.push({
      name: '',
      value: '',
    });
    setchartValues(temp);
  };
  const handleSubmitDataset = (e) => {
    e.preventDefault();
    if (currentNameOfDataset.trim() != '') {
      const temp = [...chartValues];
      temp.push({ name: currentNameOfDataset, value: currentValueOfDataset });
      setchartValues(temp);

      setcurrentNameOfDataset('');
      setcurrentValueOfDataset('');
    }
  };

  const handleSubmit = () => {};

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

              <div className='chartTypes scrollClass'>
                <Line data={data} />
                <Radar data={data} />
                <PolarArea data={data} />
                <Bubble data={data} />
                <Pie data={data} />
                <Scatter data={data} />
                <Doughnut data={data} />
                <Bar data={data} width={400} height={200} />
              </div>
              <h1>
                <button className='collpaseButton'>
                  <i class='fas fa-caret-down'></i>
                </button>
                Data:
              </h1>
              <div className='dataField'>
                {chartValues.map((item, index) => (
                  <div className='dataset' key={index}>
                    <input
                      type='text'
                      className='item'
                      placeholder='Name...'
                      value={item.name}
                    />
                    <input
                      type='text'
                      className='value'
                      placeholder='Value...'
                      value={item.value}
                    />
                    <button className='deleteData'>
                      <i className='far fa-trash-alt'></i>
                    </button>
                  </div>
                ))}
                <form className='dataset' onSubmit={handleSubmitDataset}>
                  <input
                    type='text'
                    className='item'
                    placeholder='Name...'
                    value={currentNameOfDataset}
                    onChange={(e) =>
                      handleContentChange(e, setcurrentNameOfDataset)
                    }
                  />
                  <input
                    type='text'
                    className='value'
                    placeholder='Value...'
                    value={currentValueOfDataset}
                    onChange={(e) =>
                      handleContentChange(e, setcurrentValueOfDataset)
                    }
                  />
                  <button className='deleteData'>
                    <i className='far fa-trash-alt'></i>
                  </button>
                </form>

                <button className='newData' onClick={handleAddEmpty}>
                  <i className='fas fa-plus'></i>Add dataset
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
