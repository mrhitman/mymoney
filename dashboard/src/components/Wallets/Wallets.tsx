import { List } from 'antd';
import { GetWalletResponse } from 'common/responses';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

interface WalletsState {
  wallets: GetWalletResponse[];
}

class Wallets extends PureComponent<Partial<InjectedStore>, WalletsState> {
  public state: WalletsState = {
    wallets: [],
  };

  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    const wallets = await this.store.getWallets();

    this.setState({ wallets });
  };

  public render() {
    return (
      <List
        bordered
        dataSource={this.state.wallets}
        renderItem={(wallet) => <List.Item>{wallet.name}</List.Item>}
      />
    );
  }
}

export default inject('store')(observer(Wallets));
