import React, { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Categories from 'src/components/Accounting/Categories';
import AnalysisByCategory from 'src/components/Analysis/AnalysisByCategory';
import AnalysisByPeriod from 'src/components/Analysis/AnalysisByPeriod';
import Info from 'src/components/Info/Info';
import Login from 'src/components/Login/Login';
import Layout from 'src/components/misc/Layout';
import Settings from 'src/components/Settings/Settings';
import CalendarView from 'src/components/Transactions/CalendarView';
import TransactionList from 'src/components/Transactions/TransactionList';
import { Accounting } from '../components/Accounting/Accounting';
import PrivateRoute from './PrivateRoute';

const Routes: FC = () => (
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
        <Accounting />
      </Layout>
    </PrivateRoute>

    <PrivateRoute path="/operations" exact>
      <Layout activePage="operations">
        <TransactionList />
      </Layout>
    </PrivateRoute>

    <PrivateRoute path="/categories" exact>
      <Layout activePage="categories">
        <Categories />
      </Layout>
    </PrivateRoute>

    <PrivateRoute path="/scheduler" exact>
      <Layout activePage="scheduler">
        <CalendarView />
      </Layout>
    </PrivateRoute>

    <PrivateRoute path="/analysis" exact>
      <Layout activePage="analysis">
        <AnalysisByPeriod />
      </Layout>
    </PrivateRoute>

    <PrivateRoute path="/analysis-category" exact>
      <Layout activePage="analysis-category">
        <AnalysisByCategory />
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

export default Routes;
