import {StackScreenProps} from '@react-navigation/stack';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import UI from 'react-native-ui-lib';
import Header from '../../misc/Header';
import {Icon, IconType} from '../../misc/Icon';

export class AccountSettings extends PureComponent<StackScreenProps<{}>> {
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
                {item.type === 'switch' && <UI.Switch value={item.value} />}
              </UI.View>
            </UI.View>
          )}
          data={[
            {id: 1, title: 'Main currency', value: 'UAH', type: 'Default'},
            {
              id: 2,
              title: 'Application language',
              value: 'English',
              type: 'Default',
            },
            {id: 3, title: 'Use PIN', value: false, type: 'switch'},
            {id: 4, title: 'Use fingerprint', value: false, type: 'switch'},
            {id: 5, title: 'Lockdown delay', value: '15 sec', type: 'Default'},
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

export default AccountSettings;
