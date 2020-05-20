import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export class LogginedRoutes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <div>Home</div>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default LogginedRoutes;
