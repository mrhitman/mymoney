import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function getClient(uri: string) {
  const httpLink = new HttpLink({
    uri,
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
    link: authLink.concat(httpLink)
  });
}
