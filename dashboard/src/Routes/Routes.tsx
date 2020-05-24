import { inject, observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Categories from '../components/Accounting/Categories';
import Info from '../components/Info/Info';
import Login from '../components/Login/Login';
import Layout from '../components/misc/Layout';
import { InjectedStore } from '../store/Store';
import PrivateRoute from './PrivateRoute';
import Settings from '../components/Settings/Settings';

class Routes extends React.Component {
  public get store() {
    return (this.props as InjectedStore).store;
  }

  public render() {
    return (
      <Router>
        <PrivateRoute path="/" exact>
          <Layout>
            <div>Home</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/info" exact>
          <Layout activePage="info">
            <Info />
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/accounting" exact>
          <Layout activePage="accounting">
            <div>accounting</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/categories" exact>
          <Layout activePage="accounting">
            <Categories />
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/planning" exact>
          <Layout activePage="planning">
            <div>planning</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/scheduler" exact>
          <Layout activePage="scheduler">
            <div>scheduler</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/analysis" exact>
          <Layout activePage="analysis">
            <div>analysis</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/settings" exact>
          <Layout activePage="settings">
            <Settings />
          </Layout>
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <div>register</div>
        </Route>
      </Router>
    );
  }
}

export default inject('store')(observer(Routes));
