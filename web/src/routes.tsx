import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { useAuth } from './contexts/auth';

import Loading from './components/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Landing from './pages/Landing';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate = false, ...rest }) => {
  const { loggedIn } = useAuth();

  if (isPrivate && !loggedIn) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}

const Routes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute isPrivate path="/orphanages/create" component={CreateOrphanage} />
        <CustomRoute isPrivate path="/dashboard" component={Dashboard} />

        <CustomRoute path="/" exact component={Landing} />
        <CustomRoute path="/login" component={Login} />
        <CustomRoute path="/app" component={OrphanagesMap} />
        <CustomRoute path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
