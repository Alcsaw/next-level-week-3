import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import OrphanagesMap from '../pages/OrphanagesMap';
import Login from '../pages/Login';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/app" component={OrphanagesMap} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
