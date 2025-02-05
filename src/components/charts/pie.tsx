// components/PieChart.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const PieChart = ({data}: {data: {[name:string]: any}}) => {
  const options: HighchartsReact.Props = {
    chart: {
      type: 'pie',
      height: 300,
      width: 300
    },
    title: {
      text: '',
    },
    series: [
      {
        name: 'Users',
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

