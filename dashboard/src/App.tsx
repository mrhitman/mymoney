import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";

class App extends React.PureComponent {
  public render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <div>Home</div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
