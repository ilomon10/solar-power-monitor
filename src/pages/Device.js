import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Menu } from '@blueprintjs/core';
import moment from 'moment';
import Toaster from '../components/Toaster';
import { FirebaseContext } from '../components/Firebase';
import { Box } from '../components/layout';
import Card from '../components/Card';

export default () => {
  const params = useParams();
  const firebase = useContext(FirebaseContext);
  const [device, setDevice] = useState({
    location: '',
    create_at: '',
    last_receive_data_at: '',
    produce: '',
    consump: '',
  });
  useEffect(() => {
    const prom = firebase.device(params.id).on('value', snap => {
      if (!snap.exists()) { return };
      setDevice(snap.val());
    })
    return () => {
      firebase.device(params.id).off('value', prom);
    }
  }, [firebase, params.id]);
  const copyOnClick = useCallback((e) => {
    const dummy = document.createElement('textarea');
    dummy.value = params.id;
    e.target.appendChild(dummy);
    dummy.focus();
    dummy.select();
    try {
      const copied = document.execCommand('copy');
      Toaster.show({
        message: copied ? `"${params.id}" is Copied!` : `"${params.id}" is Fail to Copy`,
        intent: copied ? 'success' : 'warning'
      })
    } catch (err) {
      Toaster.show({
        message: `Your browser not support execution \`copy\` command`,
        intent: 'warning'
      })
    }
    e.target.removeChild(dummy);
  }, [params.id]);
  return (
    <Box width="100%">
      <Card height="100%" px={1}>
        <Menu>
          <Menu.Divider title="Device" />
          <Menu.Item icon="slash" text="ID" label={`${params.id}`} onClick={copyOnClick} />
          <Menu.Item icon="map-marker" text="Location" href={`http://maps.google.com/?q=${device.location}`} labelElement={<Icon icon="share" />} target="_blank" />
          <Menu.Item icon="time" disabled text="Create At" label={moment(device.create_at).calendar()} />
          <Menu.Item icon="updated" disabled text="Last receive data" label={moment(device.last_receive_data_at).calendar()} />
          <Menu.Item icon="arrow-bottom-left" disabled text="Produce" label={`${device.produce ? (device.produce).toLocaleString(2) : 0} Wh`} />
          <Menu.Item icon="arrow-top-right" disabled text="Consume" label={`${device.consump ? (device.consump).toLocaleString(2) : 0} Wh`} />
        </Menu>
      </Card>
    </Box>
  )
}