import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from 'src/store/Store';
import AddWalletForm from './AddWalletForm';

class AddWallet extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public render() {
    return (
      <div>
        <AddWalletForm />
      </div>
    );
  }
}

export default inject('store')(observer(AddWallet));
