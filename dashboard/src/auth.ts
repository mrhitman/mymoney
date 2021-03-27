/* eslint-disable @typescript-eslint/no-use-before-define */
import axios from 'axios';
import { print } from 'graphql';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { RefreshDocument } from 'src/generated/graphql';

const uri =
  // eslint-disable-next-line no-undef
  (process.env.REACT_APP_SERVER || 'http://localhost:4000/') + 'graphql';
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

function createAuthProvider() {
  let onLoginLogout: null | ((isLogged: boolean) => void) = null;
  let onRefresh: null | ((isLogged: boolean) => void) = null;

  function getTokens(): Tokens | null {
    try {
      const tokens = localStorage.getItem('tokens');

      if (!tokens) {
        return null;
      }

      return JSON.parse(tokens) as Tokens;
    } catch (_) {
      return null;
    }
  }

  function isLoggedIn() {
    return Boolean(getTokens());
  }

  function isExpired(token: string) {
    const tokenData = jwtDecode<{ exp: number }>(token);
    return moment().unix() > tokenData.exp;
  }

  function useAuth() {
    const [state, setState] = useState({
      logged: isLoggedIn(),
      loading: false,
    });
    const listenerLogged = useCallback(
      (isLogged: boolean) => {
        setState({ logged: isLogged, loading: false });
      },
      [setState],
    );
    const listenerLoading = useCallback(
      (isLoading: boolean) => {
        setState({ ...state, loading: isLoading });
      },
      [setState],
    );

    const tokens = getTokens();
    if (!tokens) {
      logout();
    }

    useEffect(() => {
      onLoginLogout = listenerLogged;
      return () => {
        onLoginLogout = null;
      };
    }, [listenerLogged]);

    useEffect(() => {
      onRefresh = listenerLoading;
      return () => {
        onRefresh = null;
      };
    }, [listenerLoading]);

    return state;
  }

  function login(tokens: Tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));

    if (onLoginLogout) {
      onLoginLogout(true);
    }
  }

  function logout() {
    localStorage.clear();

    if (onLoginLogout) {
      onLoginLogout(false);
    }
  }

  function refreshTokens(token: string) {
    if (onRefresh) {
      onRefresh(true);
    }

    return axios
      .post(uri, {
        query: print(RefreshDocument),
        variables: { token },
      })
      .then((response) => response?.data?.data?.refresh as Tokens)
      .then(login)
      .catch(logout);
  }

  return [useAuth, login, logout, getTokens, isExpired, refreshTokens] as [
    typeof useAuth,
    typeof login,
    typeof logout,
    typeof getTokens,
    typeof isExpired,
    typeof refreshTokens,
  ];
}

export const [
  useAuth,
  login,
  logout,
  getTokens,
  isExpired,
  refreshTokens,
] = createAuthProvider();
