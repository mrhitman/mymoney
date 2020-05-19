import {StackScreenProps} from '@react-navigation/stack';
import {LanguageAlias} from 'common/account';
import {inject, observer} from 'mobx-react';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import UI from 'react-native-ui-lib';
import Header from '../../misc/Header';
import {Icon} from '../../misc/Icon';
import {InjectedStore} from '../../types';
import Api from '../../utils/api';
import {IconType} from 'common/types/icon';

export class AccountSettings extends PureComponent<
  StackScreenProps<{}> & InjectedStore
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
              flex
              margin-10
              marginR-18
              onPress={() => this.props.navigation.goBack()}>
              <Icon type={IconType.Feather} name="arrow-left" size={26} />
            </UI.TouchableOpacity>
          )}>
          <UI.Text flex marginV-10 style={styles.title}>
            Account Settings
          </UI.Text>
        </Header>
        <FlatList
          scrollEnabled
          renderItem={({item}) => (
            <UI.View key={item.id} margin-8 marginL-12 row spread>
              <UI.View>
                <UI.Text text70R>{item.title}</UI.Text>
                <UI.Text blue10 text80T>
                  {item.value}
                </UI.Text>
              </UI.View>
              <UI.View right marginR-8>
                {item.type === 'switch' && (
                  <UI.Switch
                    value={item.value}
                    onValueChange={item.handleChange}
                  />
                )}
              </UI.View>
            </UI.View>
          )}
          data={[
            {
              id: 0,
              title: 'Sync',
              type: 'switch',
              value: true,
              handleChange: async () => {
                const api = new Api();
                await Promise.all(this.store.categories.map(api.sendCategory));
              },
            },
            {id: 1, title: 'Main currency', value: 'UAH', type: 'Default'},
            {
              id: 2,
              title: 'Application language',
              value: LanguageAlias[this.store.account.language],
              type: 'Default',
            },
            {
              id: 3,
              title: 'Use PIN',
              value: this.store.account.usePassword,
              type: 'switch',
              handleChange: () => {
                this.store.account.update({
                  usePassword: !this.store.account.usePassword,
                });
              },
            },
            {
              id: 4,
              title: 'Use fingerprint',
              value: this.store.account.useFingerprint,
              type: 'switch',
              handleChange: () => {
                this.store.account.update({
                  useFingerprint: !this.store.account.useFingerprint,
                });
              },
            },
            {id: 5, title: 'Lock down delay', value: '15 sec', type: 'Default'},
          ]}
        />
      </UI.View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
});

export default inject('store')(observer(AccountSettings));
