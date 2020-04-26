import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import Header from '../misc/Header';
import Icon from '../misc/Icon';

export class Transactions extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea>
        <Header
          size="lg+"
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
                    label="Filter"
                    size="xSmall"
                    outlineColor="grey"
                    iconSource={() => <Icon type="AntDesign" name="filter" />}
                  />
                </UI.View>
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
        <UI.Text> textInComponent </UI.Text>
      </UI.View>
    );
  }
}

export default Transactions;
