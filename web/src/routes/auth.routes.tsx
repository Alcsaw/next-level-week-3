import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import Login from '../pages/Login';

const AuthRoutes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route path="/" exact component={Landing} /> */}
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default AuthRoutes;
