import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import { Observable } from 'apollo-link';
import React, { FC } from 'react';
import Routes from 'src/components/misc/Routes';
import './App.css';
import { RefreshDocument, RefreshMutation } from './generated/graphql';
import './i18n';
import IconStyles from './IconStyles';

const uri = process.env.REACT_APP_SERVER! + 'graphql';
const client = new ApolloClient({
  uri,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  },
  onError: (error) => {
    if (error.response?.errors?.some((e) => e.extensions?.exception?.status === 401)) {
      return new Observable((observer) => {
        client
          .mutate<RefreshMutation>({
            mutation: RefreshDocument,
            variables: {
              token: localStorage.getItem('refreshToken'),
            },
          })
          .then((response) => {
            const { accessToken, refreshToken } = response.data?.refresh!;
            localStorage.setItem('accessToken', accessToken!);
            localStorage.setItem('refreshToken', refreshToken!);

            const oldHeaders = error.operation.getContext().headers;
            error.operation.setContext({
              headers: {
                ...oldHeaders,
                Authorization: accessToken,
              },
            });

            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };

            return error.forward(error.operation).subscribe(subscriber);
          })
          .catch(() => {
            localStorage.clear();
          });
      });
    }
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
