import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute: React.FC<{ path?: string; exact?: boolean }> = ({
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? ( // @TODO check auth
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
