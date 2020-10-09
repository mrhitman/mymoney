import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import React, { FC } from 'react';
import './App.css';
import './i18n';
import IconStyles from './IconStyles';
import Routes from 'src/components/misc/Routes';
import { RefreshDocument, RefreshMutation } from './generated/graphql';
import history from './history';

const uri = process.env.REACT_APP_SERVER + 'graphql';
const client = new ApolloClient({
  uri, onError: (error) => {
    if (error.response?.errors?.some(e => e.extensions?.exception?.status === 401)) {
      client.mutate<RefreshMutation>({
        mutation: RefreshDocument, variables: {
          token: localStorage.getItem('refreshToken')
        }
      }).then(response => {
        const { accessToken, refreshToken } = response.data?.refresh!;
        localStorage.setItem('accessToken', accessToken!);
        localStorage.setItem('refreshToken', refreshToken!);
        return error.operation.setContext(({ headers = {} }: any) => ({
          headers: {
            ...headers as any,
            authorization: `Bearer ${accessToken}` || null,
          }
        }));
      })
        .catch(response => {
          localStorage.clear();
          history.push('/login');
        })
    }
  }
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
