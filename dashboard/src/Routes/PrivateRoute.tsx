import { inject, observer } from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { InjectedStore } from "../store/Store";

const PrivateRoute: React.FC<Partial<InjectedStore>> = ({
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.store?.isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default inject("store")(observer<IReactComponent>(PrivateRoute));
