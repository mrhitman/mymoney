import { Collapse } from 'antd';
import { sumBy, map, reduce } from 'lodash';
import { inject, observer } from 'mobx-react';
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
    return <Collapse>{map(this.store.wallets, this.renderWallet)}</Collapse>;
  }

  protected getTotal = () => {
    return reduce(
      this.store.wallets,
      (acc, wallet) => this.getWalletSum(wallet) + acc,
      0,
    );
  };

  protected getWalletSum = (wallet: any) => {
    return sumBy(wallet.pockets, (pocket: any) => {
      return this.store.rates.exchange('UAH', 'UAH', pocket.amount);
    });
  };

  protected renderWallet = (wallet: any) => (
    <Collapse.Panel
      header={
        <div className="wallet-footer">
          <div>{wallet.name}</div>
          <div className="wallet-total">{this.getTotal() + ' ₴'}</div>
        </div>
      }
      key={wallet.id}
    >
      {wallet.pockets.map(this.renderPocket)}
    </Collapse.Panel>
  );

  protected renderPocket = (pocket: any) => {
    return (
      <>
        <div className="wallet-name">{pocket.currencyId}</div>
        <div className="wallet-amount">{pocket.amount} ₴</div>
      </>
    );
  };
}

export default inject('store')(observer(Wallets));
