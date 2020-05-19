import {StackScreenProps} from '@react-navigation/stack';
import {IconType} from 'common/types/icon';
import {inject, observer} from 'mobx-react';
import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import CategoryTree from '../../misc/CategoryTree/CategoryTree';
import Header from '../../misc/Header';
import Icon from '../../misc/Icon';
import {InjectedStore} from '../../types';

export class Categories extends PureComponent<
  StackScreenProps<{}> & Partial<InjectedStore>
> {
  public get store() {
    return (this.props as InjectedStore).store;
  }

  public render() {
    return (
      <UI.View useSafeArea>
        <Header
          renderLeft={() => (
            <UI.TouchableOpacity
              margin-8
              onPress={() => this.props.navigation.goBack()}>
              <Icon type={IconType.AntDesign} name="arrowleft" size={24} />
            </UI.TouchableOpacity>
          )}>
          <UI.View margin-8>
            <UI.Text text70R>Categories</UI.Text>
          </UI.View>
        </Header>
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
