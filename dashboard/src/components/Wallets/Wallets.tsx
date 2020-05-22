import { List } from "antd";
import { GetWalletResponse } from "common/responses";
import { sumBy } from "lodash";
import { inject, observer } from "mobx-react";
import React, { PureComponent } from "react";
import { InjectedStore } from "../../store/Store";

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
        header={<div className="wallet-header">Wallets</div>}
        footer={
          <div className="wallet-footer">
            <div>Total: </div>
            <div className="wallet-total">{this.getTotal() + " ₴"}</div>
          </div>
        }
        dataSource={this.state.wallets}
        renderItem={this.renderItem}
      />
    );
  }

  protected getTotal = () => {
    return this.state.wallets.reduce(
      (acc, wallet) => this.getWalletSum(wallet) + acc,
      0
    );
  };

  protected getWalletSum = (wallet: GetWalletResponse) => {
    return sumBy(wallet.pockets, (pocket) => {
      return this.store.rates.exchange("UAH", "UAH", pocket.amount);
    });
  };

  protected renderItem = (wallet: GetWalletResponse) => (
    <List.Item>
      <div className="wallet-name">{wallet.name}</div>
      <div className="wallet-amount">{(Math.random() * 5000).toFixed(2)} ₴</div>
    </List.Item>
  );
}

export default inject("store")(observer(Wallets));
