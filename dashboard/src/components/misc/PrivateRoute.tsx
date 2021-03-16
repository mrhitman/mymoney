import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import decode from 'jwt-decode';
import moment from 'moment';

function hasActiveSession() {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken) {
    return false;
  }

  const data = decode(token) as { exp: number };
  return data.exp > moment().unix();
}

const PrivateRoute: React.FC<{ path?: string; exact?: boolean }> = ({
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasActiveSession() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
