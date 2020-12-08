import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Accounting } from 'src/components/Accounting/Accounting';
import { AnalysisByCategory } from 'src/components/Analysis/AnalysisByCategory/AnalysisByCategory';
import { AnalysisByCurrency } from 'src/components/Analysis/AnalysisByCurrency/AnalysisByCurrency';
// import AnalysisByPeriod from 'src/components/Analysis/AnalysisByPeriod';
import Categories from 'src/components/Categories/Categories';
import Connectors from 'src/components/Connectors/Connectors';
import Currencies from 'src/components/Currencies/Currencies';
import Info from 'src/components/Info/Info';
import Login from 'src/components/Login/Login';
import Layout from 'src/components/misc/Layout';
import Settings from 'src/components/Settings/Settings';
import CalendarView from 'src/components/Transactions/CalendarView';
import TransactionList from 'src/components/Transactions/TransactionList';
import { TransactionType } from 'src/generated/graphql';
import MainPage from '../MainPage/MainPage';
import Register from '../Register/Register';
import WalletTransactions from '../Transactions/WalletTransactions';
import PrivateRoute from './PrivateRoute';
import ViewTransaction from '../Transactions/ViewTransaction';

const Routes: FC = () => (
  <Router>
    <Switch>
      <PrivateRoute path="/" exact>
        <Layout>
          <MainPage />
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

      <PrivateRoute path="/incomes">
        <Layout activePage="incomes">
          <TransactionList type={TransactionType.Income} />
        </Layout>
      </PrivateRoute>

      <PrivateRoute path="/outcomes">
        <Layout activePage="outcomes">
          <TransactionList type={TransactionType.Outcome} />
        </Layout>
      </PrivateRoute>

      <PrivateRoute path="/operations/:walletId" exact>
        <Layout activePage="operations">
          <WalletTransactions />
        </Layout>
      </PrivateRoute>

      <PrivateRoute path="/operation/:trxId" exact>
        <Layout activePage="operations">
          <ViewTransaction />
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
          <div />
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

      <PrivateRoute path="/analysis-currency" exact>
        <Layout activePage="analysis-currency">
          <AnalysisByCurrency />
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
