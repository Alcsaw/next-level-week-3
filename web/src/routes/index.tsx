import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

/*import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';*/

import Loading from '../components/Loading';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import Landing from '../pages/Landing';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate, ...rest }) => {
  const { loggedIn } = useAuth();
  console.log("loggedIn", loggedIn);

  if (isPrivate && !loggedIn) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}

const Routes: React.FC = () => {
  const { loading } = useAuth();

  console.log("AUTH INDEX:", "loading:", loading)

  if (loading) {
    return <Loading />;
  }

  /*return loggedIn ? (
    <AppRoutes />
  ) : (
      <AuthRoutes />
    );*/

  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" exact component={Landing} />
        <CustomRoute path="/login" component={Login} />
        <CustomRoute path="/app" component={OrphanagesMap} />
        <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
        <CustomRoute isPrivate path="/orphanages/create" component={CreateOrphanage} />
        <CustomRoute isPrivate path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
