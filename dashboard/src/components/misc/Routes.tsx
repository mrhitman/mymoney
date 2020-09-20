import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Categories from 'src/components/Categories/Categories';
import { AnalysisByCategory } from 'src/components/Analysis/AnalysisByCategory';
import AnalysisByPeriod from 'src/components/Analysis/AnalysisByPeriod';
import Info from 'src/components/Info/Info';
import Login from 'src/components/Login/Login';
import Layout from 'src/components/misc/Layout';
import Settings from 'src/components/Settings/Settings';
import CalendarView from 'src/components/Transactions/CalendarView';
import TransactionList from 'src/components/Transactions/TransactionList';
import { Accounting } from 'src/components/Accounting/Accounting';
import PrivateRoute from './PrivateRoute';
import Connectors from 'src/components/Connectors/Connectors';
import Currencies from 'src/components/Currencies/Currencies';
import WalletTransactions from '../Transactions/WalletTransactions';
import Register from '../Register/Register';

const Routes: FC = () => (
  <Router>
    <Switch>

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

      <PrivateRoute path="/incomes" >
        <Layout activePage="incomes">
          <TransactionList type="income" />
        </Layout>
      </PrivateRoute>

      <PrivateRoute path="/outcomes" >
        <Layout activePage="outcomes">
          <TransactionList type="outcome" />
        </Layout>
      </PrivateRoute>

      <PrivateRoute path="/operations/:walletId" exact>
        <Layout activePage="operations">
          <WalletTransactions />
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

      <PrivateRoute path="/connectors" exact>
        <Layout activePage="connectors">
          <Connectors />
        </Layout>
      </PrivateRoute>

      <PrivateRoute path="/currencies" exact>
        <Layout activePage="currencies">
          <Currencies />
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
        <Register />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
