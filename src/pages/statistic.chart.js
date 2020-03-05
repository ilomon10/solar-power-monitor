import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { Flex } from '../components/layout';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';
import { FirebaseContext } from '../components/Firebase';
import styled from 'styled-components';

const SeriesStyle = styled(Flex)`
  margin-top: 16px;
  &:first-child {
    margin-top: 0;
  }
`

export default () => {
  const [series, setSeries] = useState([]);
  const params = useParams();
  const firebase = useContext(FirebaseContext);
  const defaultOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false, },
      zoom: { enabled: false }
    },
    title: { text: 'title' },
    yaxis: {
      labels: { formatter: (value) => value.toFixed(2) }
    },
    xaxis: {
      type: 'datetime',
    }
  };
  const options = [{
    ...defaultOptions,
    title: { text: 'Power' }
  }, {
    ...defaultOptions,
    title: { text: 'Voltage' }
  }, {
    ...defaultOptions,
    title: { text: 'Current' }
  }, {
    ...defaultOptions,
    title: { text: 'Temperature' }
  }];
  useEffect(() => {
    const ref = firebase.dataLake().orderByChild('device').equalTo(params.id);
    const prom = ref.on('value', (snapshot) => {
      const snap = snapshot.val();
      if (snap === null) {
        setSeries([]);
        return;
      }
      const value = Object.keys(snap).reduce((p, c) => {
        const time = snap[c].timestamp;
        return [
          [{
            ...p[0][0], data: [...p[0][0].data, [time, snap[c].powerIn]]
          }, {
            ...p[0][1], data: [...p[0][1].data, [time, snap[c].powerOut]]
          }], [{
            ...p[1][0], data: [...p[1][0].data, [time, snap[c].voltageIn]]
          }, {
            ...p[1][1], data: [...p[1][1].data, [time, snap[c].voltageOut]]
          }], [{
            ...p[2][0], data: [...p[2][0].data, [time, snap[c].currentIn]]
          }, {
            ...p[2][1], data: [...p[2][1].data, [time, snap[c].currentOut]]
          }], [{
            ...p[3][0], data: [...p[3][0].data, [time, snap[c].temperature]]
          }]
        ]
      }, [[
        { name: 'Power In', data: [] }, { name: 'Power Out', data: [] }
      ], [
        { name: 'Voltage In', data: [] }, { name: 'Voltage Out', data: [] }
      ], [
        { name: 'Current In', data: [] }, { name: 'Current Out', data: [] }
      ], [
        { name: 'Temperature', data: [] }
      ]]);
      setSeries(value);
    })
    return () => {
      ref.off('value', prom);
    }
  }, [firebase, params.id])
  return (
    <Flex height="100%" flexDirection="column">
      {options.map((option, i) => (
        <SeriesStyle key={i} flexGrow={1}>
          <Card width={1}>
            <Wrapper>
              <ApexChart height="100%" width="100%" options={option} series={series[i] || []} />
            </Wrapper>
          </Card>
        </SeriesStyle>))}
    </Flex>
  )
}