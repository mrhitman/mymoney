import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokens, isExpired } from 'src/auth';
import { refreshTokens, login, logout } from './auth';

export function getClient(uri: string) {
  const httpLink = new HttpLink({
    uri,
  });

  const refreshTokenLink = setContext(async (_, { headers }) => {
    const tokens = getTokens();
    if (tokens && isExpired(tokens.accessToken)) {
      await refreshTokens(tokens.refreshToken);
    }

    return {
      headers,
    };
  });

  const authLink = setContext((_, { headers }) => {
    const tokens = localStorage.getItem('tokens');
    return {
      headers: {
        ...headers,
        authorization: tokens ? `Bearer ${JSON.parse(tokens).accessToken}` : '',
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([refreshTokenLink, authLink, httpLink]),
  });
}
