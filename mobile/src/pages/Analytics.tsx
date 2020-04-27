import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import Header from '../misc/Header';
import Icon from '../misc/Icon';

export class Analytics extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea>
        <Header
          size="lg"
          renderLeft={() => (
            <UI.View margin-10>
              <UI.Text text60BO>Analitics</UI.Text>
            </UI.View>
          )}
          renderRight={() => (
            <UI.View margin-10>
              <Icon type="Ionicons" name="ios-settings" size={28} />
            </UI.View>
          )}
        />
        <FlatList
          renderItem={({item}) => (
            <UI.View key={item.id} marginL-6>
              <UI.View row>
                <UI.View centerV margin-10>
                  <Icon type={item.icon.type} name={item.icon.name} size={40} />
                </UI.View>
                <UI.View centerV marginL-16>
                  <UI.Text text70R>{item.name}</UI.Text>
                </UI.View>
              </UI.View>
            </UI.View>
          )}
          data={[
            {
              id: 1,
              name: 'Budget',
              icon: {name: 'dollar-bill', type: 'Foundation'},
            },
            {
              id: 2,
              name: 'Outcomes by categories',
              icon: {name: 'dollar-bill', type: 'Foundation'},
            },
            {
              id: 3,
              name: 'Incomes by categories',
              icon: {name: 'dollar-bill', type: 'Foundation'},
            },
            {
              id: 4,
              name: 'Spends trend',
              icon: {name: 'barchart', type: 'AntDesign'},
            },
            {
              id: 5,
              name: 'Money movings',
              icon: {name: 'dollar-bill', type: 'Foundation'},
            },
          ]}
        />
        <UI.Text> textInComponent </UI.Text>
      </UI.View>
    );
  }
}

export default Analytics;
