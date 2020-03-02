import React from 'react';
import { Box } from '../components/layout';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import { Icon, Menu } from '@blueprintjs/core';
import moment from 'moment';

export default () => {
  const params = useParams();
  console.log(params);
  return (
    <Box width="100%">
      <Card height="100%" px={1}>
        <Menu>
          <Menu.Divider title="Device" />
          <Menu.Item icon="slash" text="ID" label={`#${params.id}`} />
          <Menu.Item icon="map-marker" text="Location" labelElement={<Icon icon="share" />} target="_blank" />
          <Menu.Item icon="time" text="Create At" label={moment().format('MMMM Do YYYY')} />
          <Menu.Item icon="updated" text="Last receive data" label={moment().format('MMMM Do YYYY')} />
        </Menu>
      </Card>
    </Box>
  )
}