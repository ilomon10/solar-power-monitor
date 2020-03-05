import React, { useState, useContext, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { FirebaseContext } from '../components/Firebase';
import moment from 'moment';

export default ({ onDeviceChange }) => {
  const [series, setSeries] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const firebase = useContext(FirebaseContext);
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
  useEffect(() => {
    firebase.devices().limitToFirst(1).once('value', (snap) => {
      if (!snap.val()) return;
      const key = Object.keys(snap.val()).reduce((...arg) => {
        return arg[1];
      }, '');
      onDeviceChange(key);
      setDeviceId(key);
    });
    if (!deviceId) return;
    const now = moment();
    const ref = firebase.dataLake().orderByChild('timestamp')
      .startAt(now.startOf('day').valueOf())
      .endAt(now.endOf('day').valueOf())
    const prom = ref.on('value', (snapshot) => {
      if (!snapshot.val()) return;
      let snap = snapshot.val();
      snap = Object.keys(snap)
        .filter((v) => snap[v].device === deviceId).reduce((p, v) => {
          return {
            ...p,
            [v]: snap[v]
          }
        }, {});
      const data = Object.keys(snap).reduce((p, v) => {
        const time = snap[v].timestamp;
        return [{
          ...p[0], data: [...p[0].data, [time, (snap[v].temperature).toFixed(2)]]
        }, {
          ...p[1], data: [...p[1].data, [time, (snap[v].powerIn).toFixed(2)]]
        }, {
          ...p[2], data: [...p[2].data, [time, (snap[v].powerOut).toFixed(2)]]
        }]
      }, [{
        name: 'Temperature',
        data: [],
      }, {
        name: 'Produce',
        data: [],
      }, {
        name: 'Consump',
        data: [],
      }]);
      setSeries(data);
    })
    return () => {
      if (!prom || !ref) return;
      ref.off('value', prom);
    }
  }, [firebase, deviceId, onDeviceChange]);
  return (
    <ApexChart options={options} series={series}
      height="100%" width="100%" />
  )
}