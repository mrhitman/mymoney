import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import React, { FC } from 'react';
import './App.css';
import './i18n';
import IconStyles from './IconStyles';
import Routes from 'src/components/misc/Routes';


const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER + 'graphql',
  headers: {
    authorization: localStorage.getItem('accessToken'),
  },
});

const App: FC = () => {
  return (
    <ApolloProvider client={client as any}>
      <IconStyles />
      <Routes />
    </ApolloProvider>
  );
};

export default App;
