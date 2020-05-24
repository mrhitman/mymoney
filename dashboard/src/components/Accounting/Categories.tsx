import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

class Categories extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadCategories();
  };

  public render() {
    return <div />;
  }
}

export default inject('store')(observer(Categories));
