import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from '../components/layout';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';
import { FirebaseContext } from '../components/Firebase';
import styled from 'styled-components';
import Chart from '../components/Chart';

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
      group: 'trends',
    },
    dataLabels: { enabled: false },
    title: { text: 'title' },
    yaxis: {
      labels: { formatter: (value) => value.toFixed(2) }
    },
    xaxis: {
      type: 'datetime',
    }
  };
  const options = [{
    chart: {
      id: 'chart_power',
    },
    title: { text: 'Power' }
  }, {
    chart: {
      id: 'chart_voltage',
    },
    title: { text: 'Voltage' }
  }, {
    chart: {
      id: 'chart_current',
    },
    title: { text: 'Current' }
  }, {
    chart: {
      id: 'chart_temperature',
    },
    title: { text: 'Temperature' }
  }];
  const options = useCallback((name) => {
    return {
      ...options
    }
  })
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
      {options.map((option, i) => {
        return (<SeriesStyle key={option.chart.id} flexGrow={1}>
          <Card width={1}>
            <Wrapper>
              <Chart options={option} series={series[i] || []} />
            </Wrapper>
          </Card>
        </SeriesStyle>)
      })}
    </Flex>
  )
}