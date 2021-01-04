import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
import React, { FC } from 'react';
import Routes from 'src/components/misc/Routes';
import './App.css';
import './i18n';
import IconStyles from './IconStyles';
import { getClient } from './gql';

const uri = process.env.REACT_APP_SERVER! + 'graphql';
const client = getClient(uri);

const App: FC = () => {
  return (
    <ApolloProvider client={client as any}>
      <IconStyles />
      <Routes />
    </ApolloProvider>
  );
};

export default App;
