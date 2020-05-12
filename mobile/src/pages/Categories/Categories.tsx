import {inject, observer} from 'mobx-react';
import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import CategoryTree from '../../misc/CategoryTree/CategoryTree';
import {InjectedStore} from '../../types';

export class Categories extends PureComponent {
  public get store() {
    return (this.props as InjectedStore).store;
  }

  public render() {
    return (
      <UI.View useSafeArea>
        <CategoryTree
          categories={this.store.categories.filter(
            (c) => ['TRANSFER_IN', 'TRANSFER_OUT'].indexOf(c.name) === -1,
          )}
        />
      </UI.View>
    );
  }
}

export default inject('store')(observer(Categories));
