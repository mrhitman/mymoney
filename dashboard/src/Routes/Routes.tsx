import { inject, observer } from "mobx-react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login/Login";
import Layout from "../misc/Layout";
import { InjectedStore } from "../store/Store";
import PrivateRoute from "./PrivateRoute";

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

        <PrivateRoute path="/info" exact>
          <Layout activePage="info">
            <div>info</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/accounting" exact>
          <Layout activePage="accounting">
            <div>accounting</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/planning" exact>
          <Layout activePage="planning">
            <div>planning</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/scheduler" exact>
          <Layout activePage="scheduler">
            <div>scheduler</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/analysis" exact>
          <Layout activePage="analysis">
            <div>analysis</div>
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/settings" exact>
          <Layout activePage="settings">
            <div>settings</div>
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
