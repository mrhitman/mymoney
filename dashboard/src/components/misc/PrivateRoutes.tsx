import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Accounting } from 'src/components/Accounting/Accounting';
import { AnalysisByCategory } from 'src/components/Analysis/AnalysisByCategory/AnalysisByCategory';
import { AnalysisByCurrency } from 'src/components/Analysis/AnalysisByCurrency/AnalysisByCurrency';
import Categories from 'src/components/Categories/Categories';
import Connectors from 'src/components/Connectors/Connectors';
import Currencies from 'src/components/Currencies/Currencies';
import { Goals } from 'src/components/Goals/Goals';
import Info from 'src/components/Info/Info';
import Layout from 'src/components/misc/Layout';
import Settings from 'src/components/Settings/Settings';
import CalendarView from 'src/components/Transactions/CalendarView';
import ActiveBudget from '../Budgets/ActiveBudget';
import MainPage from '../MainPage/MainPage';
import { IncomesList } from '../Transactions/IncomesList';
import { OutcomesList } from '../Transactions/OutcomesList';
import ViewTransaction from '../Transactions/ViewTransaction';
import WalletTransactions from '../Transactions/WalletTransactions';

export const PrivateRoutes: FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <MainPage />
        </Layout>
      </Route>
      <Route path="/info" exact>
        <Layout activePage="info">
          <Info />
        </Layout>
      </Route>
      <Route path="/accounting" exact>
        <Layout activePage="accounting">
          <Accounting />
        </Layout>
      </Route>
      <Route path="/goals" exact>
        <Layout activePage="goals">
          <Goals />
        </Layout>
      </Route>
      <Route path="/incomes">
        <Layout activePage="incomes">
          <IncomesList />
        </Layout>
      </Route>
      <Route path="/outcomes">
        <Layout activePage="outcomes">
          <OutcomesList />
        </Layout>
      </Route>
      <Route path="/operations/:walletId" exact>
        <Layout activePage="operations">
          <WalletTransactions />
        </Layout>
      </Route>
      <Route path="/operation/:trxId" exact>
        <Layout activePage="operations">
          <ViewTransaction />
        </Layout>
      </Route>
      <Route path="/categories" exact>
        <Layout activePage="categories">
          <Categories />
        </Layout>
      </Route>
      <Route path="/scheduler" exact>
        <Layout activePage="scheduler">
          <CalendarView />
        </Layout>
      </Route>
      <Route path="/analysis" exact>
        <Layout activePage="analysis">
          <div />
        </Layout>
      </Route>
      <Route path="/connectors" exact>
        <Layout activePage="connectors">
          <Connectors />
        </Layout>
      </Route>
      <Route path="/currencies" exact>
        <Layout activePage="currencies">
          <Currencies />
        </Layout>
      </Route>
      <Route path="/analysis-category" exact>
        <Layout activePage="analysis-category">
          <AnalysisByCategory />
        </Layout>
      </Route>
      <Route path="/analysis-currency" exact>
        <Layout activePage="analysis-currency">
          <AnalysisByCurrency />
        </Layout>
      </Route>
      <Route path="/settings" exact>
        <Layout activePage="settings">
          <Settings />
        </Layout>
      </Route>
      <Route path="/budgets/active" exact>
        <Layout activePage="active-budget">
          <ActiveBudget />
        </Layout>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
