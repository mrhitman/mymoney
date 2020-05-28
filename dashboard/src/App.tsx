import "antd/dist/antd.css";
import { Provider } from "mobx-react";
import React from "react";
import "./App.css";
import "./i18n";
import Routes from "./Routes/Routes";
import { api, Store } from "./store/Store";

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
