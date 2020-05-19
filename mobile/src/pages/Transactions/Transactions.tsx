import {IconType} from 'common/types/icon';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import UI from 'react-native-ui-lib';
import Icon from '../../misc/Icon';
import Header from './Header';

export class Transactions extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea flex>
        <Header />

        <UI.View>
          <FlatList
            ItemSeparatorComponent={() => (
              <UI.View bg-grey50 marginL-50 marginR-8 style={{height: 1}} />
            )}
            renderItem={({item}) => (
              <UI.View key={item.id} padding-4 bg-white row spread>
                <UI.View left row>
                  <UI.View
                    br60
                    margin-8
                    padding-5
                    bg-dark70
                    centerV
                    centerH
                    style={{height: 38}}>
                    <Icon
                      type={IconType.MaterialCommunityIcons}
                      name="food"
                      size={28}
                    />
                  </UI.View>

                  <UI.View marginL-10>
                    <UI.Text text60BO>{item.name}</UI.Text>
                    <UI.Text text70R>{item.name}</UI.Text>
                    <UI.Text text80L>{item.name}</UI.Text>
                  </UI.View>
                </UI.View>

                <UI.View right margin-8>
                  <UI.Text text60>-65 $</UI.Text>
                </UI.View>
              </UI.View>
            )}
            data={[
              {
                id: 1,
                name: 'Test 1',
              },
              {
                id: 2,
                name: 'Test 2',
              },
              {
                id: 3,
                name: 'Test 3',
              },
              {
                id: 4,
                name: 'Test 4',
              },
            ]}
          />
        </UI.View>
      </UI.View>
    );
  }
}

export default Transactions;
