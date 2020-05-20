import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';

export class NotLogginedRoutes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <div>Home</div>
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default NotLogginedRoutes;
