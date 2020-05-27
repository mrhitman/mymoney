import { Collapse } from "antd";
import { Pocket, Wallet } from "common";
import { sumBy } from "lodash";
import { inject, observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import React, { PureComponent } from "react";
import { InjectedStore } from "../../store/Store";

class Wallets extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    const store = this.store;
    await store.loadCurrencies();
    await store.loadCategories();
    await store.loadWallets();
  };

  public render() {
    return <Collapse>{this.store.wallets.map(this.renderWallet)}</Collapse>;
  }

  protected getTotal = () => {
    return this.store.wallets
      .reduce((acc, wallet) => this.getWalletSum(wallet) + acc, 0)
      .toFixed(1);
  };

  protected getWalletSum = (wallet: Instance<typeof Wallet>): number => {
    return sumBy(wallet.pockets, (pocket) =>
      this.store.rates.exchange(pocket.currency.name, "UAH", pocket.amount)
    );
  };

  protected renderWallet = (wallet: Instance<typeof Wallet>) => (
    <Collapse.Panel
      header={
        <div className="wallet-footer">
          <div>{wallet.name}</div>
          <div className="wallet-total">
            {this.getWalletSum(wallet).toFixed(1) + " ₴"}
          </div>
        </div>
      }
      key={wallet.id}
    >
      {wallet.pockets.map(this.renderPocket)}
    </Collapse.Panel>
  );

  protected renderPocket = (pocket: Instance<typeof Pocket>) => {
    return (
      <div className="row-item">
        <div className="wallet-name">{pocket.currency.name}</div>
        <div className="wallet-amount">{pocket.amount} ₴</div>
      </div>
    );
  };
}

export default inject("store")(observer(Wallets));
