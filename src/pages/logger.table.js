import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Card from '../components/Card';
import Table from '../components/Table';
import { FirebaseContext } from '../components/Firebase';
import { Spinner, NonIdealState } from '@blueprintjs/core';
import SpinnerWrapper from '../components/SpinnerWrapper';

export default () => {
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const params = useParams();
  const firebase = useContext(FirebaseContext);
  const tableHead = [[
    { title: 'Timestamp', row: 2 },
    { title: 'Produce', col: 3 },
    { title: 'Consump', col: 3 },
    { title: 'Temperature', row: 2 }
  ], [
    { title: 'Power' },
    { title: 'Voltage' },
    { title: 'Current' },
    { title: 'Power' },
    { title: 'Voltage' },
    { title: 'Current' }
  ]];
  const column = ['timestamp', 'powerIn', 'voltageIn', 'currentIn', 'powerOut', 'voltageOut', 'currentOut', 'temperature'];
  useEffect(() => {
    setIsEmpty(false);
    setData([]);
    const ref = firebase.dataLake().orderByChild('device').equalTo(params.id);
    const prom = ref.on('value', (snapshot) => {
      const snap = snapshot.val();
      if (snap === null) {
        setIsEmpty(true);
        return;
      };
      const value = Object.keys(snap).map(v => {
        const toLocaleString = (s, l = 2) => s.toLocaleString(l);
        return {
          temperature: toLocaleString(snap[v].temperature),
          powerIn: toLocaleString(snap[v].powerIn),
          voltageIn: toLocaleString(snap[v].voltageIn),
          currentIn: toLocaleString(snap[v].currentIn),
          powerOut: toLocaleString(snap[v].powerOut),
          voltageOut: toLocaleString(snap[v].voltageOut),
          currentOut: toLocaleString(snap[v].currentOut),
          timestamp: moment(snap[v].timestamp).calendar(),
          device: snap[v].device.slice(0, 6),
          uid: v
        }
      });
      setData(value);
    })
    return () => {
      ref.off('value', prom);
    }
  }, [firebase, params.id]);
  return (
    <Card height="100%" width={1} p={0} style={{ overflowY: 'auto' }}>
      {isEmpty && data.length === 0 &&
        <NonIdealState icon="error" title="Empty" />}
      {!isEmpty && data.length === 0 &&
        (<SpinnerWrapper>
          <Spinner size={50} />
        </SpinnerWrapper>)}
      {data.length > 0 &&
        <Table data={data} column={column} head={tableHead} />}
    </Card>
  )
}