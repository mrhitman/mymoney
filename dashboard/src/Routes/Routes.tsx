import { inject, observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { InjectedStore } from '../store/Store';
import LogginedRoutes from './LogginedRoutes';
import NotLogginedRoutes from './NotLogginedRoutes';

export class Routes extends PureComponent {
  public get store() {
    return (this.props as InjectedStore).store;
  }

  public render() {
    return (
      <Router>
        <div className="App">
          {this.store.isLoggined ? <LogginedRoutes /> : <NotLogginedRoutes />}
        </div>
      </Router>
    );
  }
}

export default inject('store')(observer<IReactComponent>(Routes));
