import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import UI from 'react-native-ui-lib';
import Header from '../misc/Header';
import Icon, {IconType} from '../misc/Icon';

export class Transactions extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea flex>
        <Header
          size="xlg"
          renderLeft={() => (
            <UI.View row top flex marginT-8>
              <UI.View>
                <UI.View row>
                  <UI.View margin-8 marginR-20>
                    <UI.Text text70BL>9.860 $</UI.Text>
                    <UI.Text text80L grey10>
                      I have
                    </UI.Text>
                  </UI.View>
                  <UI.View margin-8>
                    <UI.Text text70BL>71.360 $</UI.Text>
                    <UI.Text text80L grey10>
                      Available
                    </UI.Text>
                  </UI.View>
                </UI.View>
                <UI.View row marginL-8>
                  <UI.Button
                    outline
                    margin-2
                    label=" Filter "
                    size="xSmall"
                    outlineColor="grey"
                    iconSource={() => (
                      <Icon
                        type={IconType.MaterialCommunityIcons}
                        name="filter-variant"
                        size={18}
                      />
                    )}
                  />
                  <UI.Button
                    outline
                    margin-2
                    label=" New · 15 "
                    size="xSmall"
                    outlineColor="grey"
                  />
                </UI.View>
              </UI.View>
            </UI.View>
          )}
          renderRight={() => (
            <UI.View row top flex marginT-8>
              <UI.View margin-8 marginR-10>
                <Icon type={IconType.Ionicons} name="ios-refresh" size={25} />
              </UI.View>
              <UI.View margin-8 marginR-20>
                <Icon type={IconType.Ionicons} name="ios-search" size={25} />
              </UI.View>
            </UI.View>
          )}
        />

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
