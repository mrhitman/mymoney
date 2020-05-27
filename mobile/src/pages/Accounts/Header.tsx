import {IconType} from 'common/src/types/icon';
import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import CommonHeader from '../../misc/Header';
import Icon from '../../misc/Icon';

export class Header extends PureComponent {
  render() {
    return (
      <CommonHeader
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
              <UI.Button
                backgroundColor={UI.Colors.grey50}
                iconSource={() => (
                  <Icon type={IconType.Feather} name="pie-chart" size={26} />
                )}
              />
            </UI.View>
            <UI.View margin-8 marginR-20>
              <UI.Button
                backgroundColor={UI.Colors.grey50}
                iconSource={() => (
                  <Icon type={IconType.Feather} name="plus" size={26} />
                )}
              />
            </UI.View>
          </UI.View>
        )}
      />
    );
  }
}

export default Header;
