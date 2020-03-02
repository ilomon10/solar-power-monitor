import React from 'react';
import { Flex } from '../components/layout';
import { Route, Switch } from 'react-router-dom';
import StatisticDevices from '../pages/statistic.devices';
import StatisticDevice from '../pages/statistic.device';
import LoggerTable from './logger.table';
import { NonIdealState } from '@blueprintjs/core';

export default () => {
  return (
    <Flex width="100%" py={3}
      justifyContent="center" alignItems="center">
      <Flex px={3}
        maxHeight={748} maxWidth={1024}
        height="100%" width={1}>
        <Flex width={1 / 3} flexDirection="column">
          <Flex flexGrow={1}>
            <StatisticDevices path='/logger/' />
          </Flex>
          <Flex flexShrink={0}>
            <Route path="/logger/:id" component={StatisticDevice} />
          </Flex>
        </Flex>
        <Flex width={2 / 3} pl={3}>
          <Switch>
            <Route path='/logger/:id' component={LoggerTable} />
            <Route path='/logger/' >
              <NonIdealState
                icon="regression-chart"
                title="Select a device"
                description="At left menu to show data graph"
              />
            </Route>
          </Switch>
        </Flex>
      </Flex>
    </Flex>
  )
}