import React from 'react';
import { Box, Flex } from '../components/layout';
import Devices from './Devices';
import Device from './Device';
import StatisticChart from './statistic.chart';
import { Route, Switch } from 'react-router-dom';
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
            <Devices path='/statistic/' />
          </Flex>
          <Flex flexShrink={0}>
            <Route path="/statistic/:id" component={Device} />
          </Flex>
        </Flex>
        <Box width={2 / 3} height="100%" pl={3}>
          <Switch>
            <Route path="/statistic/:id" component={StatisticChart} />
            <Route path="/statistic">
              <NonIdealState
                icon="regression-chart"
                title="Select a device"
                description="At left menu to show data graph"
              />
            </Route>
          </Switch>
        </Box>
      </Flex>
    </Flex>
  )
}