import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RefreshDocument } from './generated/graphql';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

export function getClient(uri: string) {
  const httpLink = new HttpLink({
    uri,
  });

  const refreshTokenLink = setContext(async (_, { headers }) => {
    const tokens = localStorage.getItem('tokens');

    if (tokens) {
      try {
        const { accessToken, refreshToken } = JSON.parse(tokens);
        const tokenData = jwtDecode<{ id: number; exp: number }>(accessToken);
        const timeShift = 5;

        if ((moment().unix() - tokenData.exp) > timeShift) {
          const body = await fetch(uri, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              operationName: 'Refresh',
              query: `mutation Refresh($token: String!) {
                refresh(refreshData: {refreshToken: $token}) {
                  accessToken
                  refreshToken
                }
              }`,
              variables: {
                token: refreshToken
              }
            })
          }).then(res => res.json());
          console.log('token updated');
          localStorage.setItem('tokens', JSON.stringify(body.data.refresh));
        }

      } catch (e) {
        console.log(e)
      }
    }

    return {
      headers,
    }
  });

  const authLink = setContext((_, { headers }) => {
    const tokens = localStorage.getItem('tokens');
    return {
      headers: {
        ...headers,
        authorization: tokens ? `Bearer ${JSON.parse(tokens).accessToken}` : "",
      }
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([refreshTokenLink, authLink, httpLink])
  });
}
