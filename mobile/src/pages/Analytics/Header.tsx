import {IconType} from 'common/types/icon';
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
          <UI.View margin-10>
            <UI.Text text60BO>Analitics</UI.Text>
          </UI.View>
        )}
        renderRight={() => (
          <UI.View margin-10>
            <Icon type={IconType.Ionicons} name="ios-settings" size={28} />
          </UI.View>
        )}
      />
    );
  }
}

export default Header;
