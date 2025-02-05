// components/VariableRadiusPieChart.js
import React from 'react';
import Highcharts from 'highcharts';
import 'highcharts/themes/dark-blue';
import HighchartsReact from 'highcharts-react-official';
import variablePie from 'highcharts/modules/variable-pie';

variablePie(Highcharts);


export const VariableRadiusPieChart = ({data}: {data: Record<string, any>}) => {
  const options: HighchartsReact.Props = {
    chart: {
      type: 'variablepie',
      height: 300,
      width: 300
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      },
    },
    series: [
      {
        minPointSize: 5,
        innerSize: '30%',
        zMin: 0,
        borderRadius: 5,
        name: 'Users',
        colorByPoint: true,
        data: data
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

