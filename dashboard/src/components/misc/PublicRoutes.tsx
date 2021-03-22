import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'src/components/Login/Login';
import ChangePassword from '../Login/ChangePassword';
import RecoverPassword from '../Login/RecoverPassword';
import Register from '../Register/Register';

export const PublicRoutes: FC = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/recover-password">
        <RecoverPassword />
      </Route>
      <Route path="/change-password/:token">
        <ChangePassword />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
