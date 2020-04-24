import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import UI from 'react-native-ui-lib';
import {Header} from '../misc/Header';
import Icon from '../misc/Icon';

const data = [
  {
    id: 1,
    title: 'test 1',
  },
  {
    id: 2,
    title: 'test 2',
  },
];
export class Home extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea flex>
        <Header
          size="lg"
          renderLeft={() => (
            <UI.View row center flex>
              <UI.View margin={2} marginR-20>
                <UI.Text text70BL>9.860 $</UI.Text>
                <UI.Text text80L grey10>
                  I have
                </UI.Text>
              </UI.View>
              <UI.View margin={2}>
                <UI.Text text70BL>71.360 $</UI.Text>
                <UI.Text text80L grey10>
                  Available
                </UI.Text>
              </UI.View>
            </UI.View>
          )}
          renderRight={() => (
            <UI.View row center flex>
              <UI.View margin-4 marginR-10>
                <Icon type="Feather" name="pie-chart" size={26} />
              </UI.View>
              <UI.View margin-4 marginR-20>
                <Icon type="Feather" name="plus" size={26} />
              </UI.View>
            </UI.View>
          )}
        />
        <UI.View row>
          <UI.Card height={120} width={120} marginV-20 marginR-20>
            <UI.Text>asdas</UI.Text>
          </UI.Card>
          <UI.Card height={120} width={120} marginV-20 marginR-20>
            <UI.Text>asdas</UI.Text>
          </UI.Card>
          <UI.Card height={120} width={120} marginV-20 marginR-20>
            <UI.Text>asdas</UI.Text>
          </UI.Card>
        </UI.View>
        <UI.View>
          <FlatList
            renderItem={({item}) => (
              <UI.ListItem key={item.id} margin-1>
                <UI.View left row>
                  <UI.View margin-14 marginR-24>
                    <Icon type="Feather" name="pie-chart" size={26} />
                  </UI.View>
                  <UI.View>
                    <UI.Text text60BL>{item.title}</UI.Text>
                    <UI.Text text80L>{item.title}</UI.Text>
                  </UI.View>
                </UI.View>

                <UI.View right>
                  <UI.Text text50BO>935.70 $</UI.Text>
                </UI.View>
              </UI.ListItem>
            )}
            data={data}
          />
        </UI.View>
      </UI.View>
    );
  }
}

export default Home;
