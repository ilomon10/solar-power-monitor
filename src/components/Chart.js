import React from 'react';
import ApexChart from 'react-apexcharts';

export default function Chart({ options, series }) {
  console.log(options.chart);
  return (
    <div>
      <ApexChart height="100%" width="100%" options={options} series={series} />
    </div>
  )
}