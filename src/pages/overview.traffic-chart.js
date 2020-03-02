import React from 'react';
import ApexChart from 'react-apexcharts';

export default () => {
  const now = new Date().getTime();
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((v) => [now + (60000 * v), (Math.random() * 12).toFixed(2)]);
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    legend: {
      show: false
    },
    yaxis: [{
      seriesName: 'dot',
      floating: true,
      labels: {
        align: 'left',
        offsetY: 10,
        offsetX: 43
      }
    }, {
      show: false
    }],
    markers: {
      size: [0, 5]
    },
    stroke: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '5%',
        barHeight: '70%',
      }
    },
    xaxis: {
      type: 'datetime',
    }
  };
  const series = [{
    name: 'Bar',
    type: 'column',
    data: data
  }, {
    name: 'Dot',
    type: 'line',
    data: data
  }];
  return (
    <ApexChart options={options} series={series}
      height="100%" width="100%" />
  )
}