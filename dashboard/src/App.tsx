import React from 'react';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import './App.css';
import Routes from './Routes/Routes';
import { Store, api } from './store/Store';

const store = Store.create();
api.setOnLogout(store.exit);

class App extends React.PureComponent {
  public componentDidMount = async () => {
    if (store.isAuthorized) {
      await store.init();
    }
  };

  public render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
