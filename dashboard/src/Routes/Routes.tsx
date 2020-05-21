import {inject, observer} from "mobx-react";
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "../Login/Login";
import {InjectedStore} from "../store/Store";
import PrivateRoute from "./PrivateRoute";
import Layout from "../misc/Layout";

class Routes extends React.Component {
  public get store() {
    return (this.props as InjectedStore).store;
  }

  public render() {
    return (
      <Router>
        <PrivateRoute path="/" exact>
          <Layout>
            <div>Home</div>
          </Layout>
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <div>register</div>
        </Route>
      </Router>
    );
  }
}

export default inject("store")(observer(Routes));
