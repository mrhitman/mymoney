import {StackScreenProps} from '@react-navigation/stack';
import {inject, observer} from 'mobx-react';
import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import Header from '../../misc/Header';
import Icon, {IconType} from '../../misc/Icon';
import {InjectedStore} from '../../types';

export class Currencies extends PureComponent<
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
            <UI.Text text70R>Currencies</UI.Text>
          </UI.View>
        </Header>
        <UI.Text> textInComponent </UI.Text>
      </UI.View>
    );
  }
}

export default inject('store')(observer(Currencies));
