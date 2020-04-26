import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import UI from 'react-native-ui-lib';
import {Header} from '../misc/Header';
import Icon from '../misc/Icon';
import {ScrollView} from 'react-native-gesture-handler';
import Collapsable from '../misc/Collapsable';

const data = [
  {
    id: 1,
    title: 'test 1',
    amount: 8445.32,
  },
  {
    id: 2,
    title: 'test 2',
    amount: 935.7,
  },
];
export class Home extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea flex>
        <Header
          size="lg"
          renderLeft={() => (
            <UI.View row top flex marginT-8>
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
          )}
          renderRight={() => (
            <UI.View row top flex marginT-8>
              <UI.View margin-8 marginR-10>
                <Icon type="Feather" name="pie-chart" size={26} />
              </UI.View>
              <UI.View margin-8 marginR-20>
                <Icon type="Feather" name="plus" size={26} />
              </UI.View>
            </UI.View>
          )}
        />
        <Collapsable title={'BANKS'}>
          <UI.View row padding-6>
            {[0, 1, 2].map((_, i) => (
              <UI.Card
                key={i}
                height={120}
                width={120}
                marginV-20
                marginR-20
                padding-8
                spread>
                <Icon type="AntDesign" name="bank" size={28} />
                <UI.Text text70L>Bank X</UI.Text>
                <UI.Text text90L>18:34</UI.Text>
                <UI.View right>
                  <Icon type="FontAwesome" name="repeat" size={18} />
                </UI.View>
              </UI.Card>
            ))}
          </UI.View>
        </Collapsable>

        <ScrollView>
          <UI.View>
            <FlatList
              renderItem={({item}) => (
                <UI.View key={item.id} spread row padding-4 bg-white>
                  <UI.View left row>
                    <UI.View margin-14 marginR-24>
                      <Icon type="AntDesign" name="wallet" size={26} />
                    </UI.View>
                    <UI.View>
                      <UI.Text text60>{item.title}</UI.Text>
                      <UI.Text text80L>{item.title}</UI.Text>
                    </UI.View>
                  </UI.View>

                  <UI.View right margin-8>
                    <UI.Text text70>{item.amount} $</UI.Text>
                  </UI.View>
                </UI.View>
              )}
              data={data}
            />
          </UI.View>
        </ScrollView>
        <UI.View row top margin-8>
          <UI.Button
            link
            iconSource={() => <Icon type="AntDesign" name="plus" size={30} />}
          />
          <UI.Text margin-8 marginL-12 onPress={() => {}}>
            Add card, income, credit, ...
          </UI.Text>
        </UI.View>
      </UI.View>
    );
  }
}

export default Home;
