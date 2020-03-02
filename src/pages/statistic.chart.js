import React from 'react';
import { Flex } from '../components/layout';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';
import ApexChart from 'react-apexcharts';

export default () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false, },
      zoom: { enabled: false }
    },
    title: {
      text: 'bijon'
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
  }];
  return (
    <Flex height="100%" flexDirection="column">
      <Flex flexGrow={1}>
        <Card width={1}>
          <Wrapper>
            <ApexChart height="100%" width="100%" options={options} series={series} />
          </Wrapper>
        </Card>
      </Flex>
      <Flex flexGrow={1} mt={3}>
        <Card width={1}>
          <Wrapper>
            <ApexChart height="100%" width="100%" options={options} series={series} />
          </Wrapper>
        </Card>
      </Flex>
      <Flex flexGrow={1} mt={3}>
        <Card width={1}>
          <Wrapper>
            <ApexChart height="100%" width="100%" options={options} series={series} />
          </Wrapper>
        </Card>
      </Flex>
    </Flex>
  )
}