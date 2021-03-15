import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import decode from 'jwt-decode';
import moment from 'moment';
import axios from 'axios';
import { RefreshDocument } from 'src/generated/graphql';
import { print } from 'graphql';

export function getClient(uri: string) {
  let client: ApolloClient<NormalizedCacheObject>;
  const httpLink = new HttpLink({
    uri,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers = {} }) => {
      let token = localStorage.getItem('accessToken');
      let refreshToken = localStorage.getItem('refreshToken');

      if (!token || !refreshToken) {
        return headers;
      }

      const data = decode(token) as { exp: number };

      if (data.exp < moment().unix()) {
        const newTokensResponse = await axios.post(uri, {
          query: print(RefreshDocument),
          variables: { token: refreshToken },
        });

        if (!newTokensResponse.data.data) {
          localStorage.clear();
          return { headers };
        }

        const newTokens = newTokensResponse.data.data?.refresh as {
          accessToken: string;
          refreshToken: string;
        };
        token = newTokens.accessToken;
        refreshToken = newTokens.refreshToken;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
      }

      return {
        headers: {
          ...headers,
          Authorization: 'Bearer ' + token,
        },
      };
    });

    return forward(operation);
  });

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authMiddleware, httpLink]),
  });

  return client;
}
