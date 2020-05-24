import { Collapse } from 'antd';
import { Pocket, Wallet } from 'common';
import { map, reduce, sumBy } from 'lodash';
import { inject, observer } from 'mobx-react';
import { Instance, cast } from 'mobx-state-tree';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

class Wallets extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    const store = this.store;
    await store.loadCategories();
    await store.loadCurrencies();
    await store.loadWallets();
  };

  public render() {
    return <Collapse>{this.store.wallets.map(this.renderWallet)}</Collapse>;
  }

  protected getTotal = () => {
    return reduce(
      this.store.wallets as Instance<typeof Wallet>[],
      (acc, wallet) => this.getWalletSum(wallet) + acc,
      0,
    );
  };

  protected getWalletSum = (wallet: Instance<typeof Wallet>) => {
    return sumBy(wallet.pockets as Instance<typeof Pocket>[], (pocket) => {
      return this.store.rates.exchange('UAH', 'UAH', pocket.amount);
    });
  };

  protected renderWallet = (wallet: Instance<typeof Wallet>) => (
    <Collapse.Panel
      header={
        <div className="wallet-footer">
          <div>{wallet.name}</div>
          <div className="wallet-total">{this.getTotal() + ' ₴'}</div>
        </div>
      }
      key={wallet.id}
    >
      {map(wallet.pockets, this.renderPocket)}
    </Collapse.Panel>
  );

  protected renderPocket = (pocket: Instance<typeof Pocket>) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div className="wallet-name">{pocket.currency.name}</div>
        <div className="wallet-amount">{pocket.amount} ₴</div>
      </div>
    );
  };
}

export default inject('store')(observer(Wallets));
