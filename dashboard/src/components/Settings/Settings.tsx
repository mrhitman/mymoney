import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

class Settings extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadProfile();
  };
  public render() {
    return <pre>{JSON.stringify(this.store.account, null, 2)}</pre>;
  }
}

export default inject('store')(observer(Settings));
