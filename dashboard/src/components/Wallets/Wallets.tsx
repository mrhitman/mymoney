import {Collapse} from 'antd';
import {Pocket, Wallet} from 'common';
import {Instance} from 'mobx-state-tree';
import React, {PureComponent} from 'react';

class Wallets extends PureComponent {
  public render() {
    return (
      <Collapse>
      </Collapse>
    );
  }

  protected getTotal = () => {
    return '0';
  };

  protected getWalletSum = (wallet: Instance<typeof Wallet>): number => {
    return 0;
  };

  protected renderWallet = (wallet: Instance<typeof Wallet>) => (
    <Collapse.Panel
      header={
        <div className="wallet-footer">
          <div>{wallet.name}</div>
          <div className="wallet-total">
            {this.getWalletSum(wallet).toFixed(1) + ' ₴'}
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
        <div className="wallet-amount">
          {pocket.amount} {pocket.currency.symbol}
        </div>
      </div>
    );
  };
}

export default Wallets;
