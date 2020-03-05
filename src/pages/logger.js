import React from 'react';
import { Flex } from '../components/layout';
import { Route, Switch } from 'react-router-dom';
import Devices from '../pages/Devices';
import Device from '../pages/Device';
import LoggerTable from './logger.table';
import { NonIdealState } from '@blueprintjs/core';

export default () => {
  return (
    <Flex width="100%" py={3}
      justifyContent="center" alignItems="center">
      <Flex px={3}
        maxHeight={748} maxWidth={1024}
        height="100%" width={1}>
        <Flex width={1 / 4} flexDirection="column">
          <Flex flexGrow={1}>
            <Devices path='/logger/' />
          </Flex>
          <Flex flexShrink={0}>
            <Route path="/logger/:id" component={Device} />
          </Flex>
        </Flex>
        <Flex width={3 / 4} pl={3}>
          <Switch>
            <Route path='/logger/:id' component={LoggerTable} />
            <Route path='/logger/' >
              <NonIdealState
                icon="th"
                title="Select a device"
                description="At left menu to show log data"
              />
            </Route>
          </Switch>
        </Flex>
      </Flex>
    </Flex>
  )
}