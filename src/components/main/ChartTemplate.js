import React from 'react';
import { Doughnut, Bar, PolarArea, Line, Radar, Pie } from 'react-chartjs-2';

export default function ChartTemplate({ data, type, options }) {
  switch (type) {
    case 0: {
      return <Line data={data} options={options} />;
    }
    case 1: {
      return <Radar data={data} options={options} />;
    }
    case 2: {
      return <PolarArea data={data} options={options} />;
    }
    case 3: {
      return <Pie data={data} options={options} />;
    }
    case 4: {
      return <Doughnut data={data} options={options} />;
    }
    case 5: {
      return <Bar data={data} options={options} />;
    }
  }
}
