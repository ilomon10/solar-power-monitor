import React from 'react';
import ApexChart from 'react-apexcharts';

export default () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false, },
      zoom: { enabled: false }
    },
    yaxis: {
      floating: true,
      labels: {
        align: 'left',
        offsetY: 10,
        offsetX: 43
      }
    },
    xaxis: {
      type: 'datetime',
    }
  };
  const now = new Date().getTime();
  const series = [{
    name: 'Voltage',
    data: data.map((v, i) => [now + (60000 * v), (Math.random() * 12).toFixed(2)])
  }, {
    name: 'Current',
    data: data.map((v, i) => [now + (60000 * v), (Math.random() * 2).toFixed(2)])
  }, {
    name: 'Temperature',
    data: data.map((v, i) => [now + (60000 * v), (Math.random() * 40).toFixed(2)])
  }];
  return (
    <ApexChart options={options} series={series}
      height="100%" width="100%" />
  )
}