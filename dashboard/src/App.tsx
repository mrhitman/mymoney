import React from 'react';
import './App.css';
import Login from './Login/Login';
import {} from '@blueprintjs/core';

class App extends React.PureComponent {
  public render() {
    return (
      <div className="App">
        <div className="login">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
