import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { InjectedStore } from 'src/store/Store';

class AddWalletForm extends PureComponent<
  Partial<InjectedStore> & WithTranslation
> {
  public get store() {
    return this.props.store!;
  }

  public render() {
    return <div></div>;
  }
}

export default withTranslation()(inject('store')(observer(AddWalletForm)));
