import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { FirebaseContext } from '../components/Firebase';
import Table from '../components/Table';

export default () => {
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const now = moment();
    const ref = firebase.dataLake().orderByChild('timestamp')
      .startAt(now.startOf('day').valueOf())
      .endAt(now.endOf('day').valueOf())
    const prom = ref.on('value', (snapshot) => {
      const snap = snapshot.val();
      const value = Object.keys(snap).map(v => {
        return {
          powerIn: snap[v].powerIn.toFixed(2),
          powerOut: snap[v].powerOut.toFixed(2),
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
  }, [firebase]);
  const tableHead = [[
    { title: 'Device' },
    { title: 'Timestamp' },
    { title: 'Produce' },
    { title: 'Consump' },
  ]]
  const column = ['device', 'timestamp', 'powerIn', 'powerOut'];
  return (
    <Table interactive condensed column={column} data={data.reverse()} head={tableHead} />
  )
}