import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import UI from 'react-native-ui-lib';
import Collapsable from '../../misc/Collapsable';
import Icon, {IconType} from '../../misc/Icon';
import {Header} from './Header';

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

export class Accounts extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea flex>
        <Header />
        <Collapsable title={'BANKS'}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <UI.View row padding-6>
              {[0, 1, 2].map((_, i) => (
                <UI.Card
                  key={i}
                  height={110}
                  width={120}
                  marginV-20
                  marginR-20
                  padding-8>
                  <Icon type={IconType.AntDesign} name="bank" size={28} />
                  <UI.Text text70L>Bank X</UI.Text>
                  <UI.Text text90L>18:34</UI.Text>
                  <UI.View right>
                    <Icon type={IconType.FontAwesome} name="repeat" size={18} />
                  </UI.View>
                </UI.Card>
              ))}
            </UI.View>
          </ScrollView>
        </Collapsable>

        <ScrollView>
          <FlatList
            renderItem={({item}) => (
              <UI.View key={item.id} spread row padding-4 bg-white>
                <UI.View left row>
                  <UI.View margin-14 marginR-24>
                    <Icon type={IconType.AntDesign} name="wallet" size={26} />
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
        </ScrollView>
        <UI.View row top margin-8>
          <UI.Button
            link
            iconSource={() => (
              <Icon type={IconType.AntDesign} name="plus" size={30} />
            )}
          />
          <UI.Text margin-8 marginL-12 onPress={() => {}}>
            Add card, income, credit, ...
          </UI.Text>
        </UI.View>
      </UI.View>
    );
  }
}

export default Accounts;
