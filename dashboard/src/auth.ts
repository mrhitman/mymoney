import { print } from 'graphql';
import { createAuthProvider } from 'react-token-auth';
import { RefreshDocument } from 'src/generated/graphql';

const uri =
  // eslint-disable-next-line no-undef
  (process.env.REACT_APP_SERVER || 'http://localhost:4000/') + 'graphql';

export const [useAuth, authFetch, login, logout] = createAuthProvider<{
  accessToken: string;
  refreshToken: string;
}>({
  localStorageKey: 'tokens',
  accessTokenKey: 'accessToken',
  accessTokenExpireKey: 'refreshToken',
  onUpdateToken: (token) =>
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify({
        query: print(RefreshDocument),
        variables: { token },
      }),
    }).then((r) => r.json()),
});