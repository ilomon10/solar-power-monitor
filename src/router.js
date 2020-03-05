import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login';
import App from './App';
import PrivateRoute from './components/PrivateRoute';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' component={App} />
    </Switch>
  </BrowserRouter>
)