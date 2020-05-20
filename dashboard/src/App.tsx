import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import Routes from './Routes/Routes';
import { Store } from './store/Store';

const store = Store.create();
class App extends React.PureComponent {
  public render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
