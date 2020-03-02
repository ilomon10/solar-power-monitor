import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageWrapper from './components/PageWrapper';
import Sidebar from './components/Sidebar';
import Statistic from './pages/statistic';
import Overview from './pages/overview';
import Logger from './pages/logger';
import { Flex } from './components/layout';

function App() {
  return (
    <PageWrapper>
      <Flex height="100%">
        <Flex flexShrink="0">
          <Sidebar />
        </Flex>
        <Flex flexGrow="1" overflowY="auto">
          <Switch>
            <Route path="/statistic" component={Statistic} />
            <Route path="/logger" component={Logger} />
            <Route exact path="/" component={Overview} />
          </Switch>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

export default App;
