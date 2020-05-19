import {IconType} from 'common/types/icon';
import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';
import HeaderCommon from '../../misc/Header';
import Icon from '../../misc/Icon';

export class Header extends PureComponent {
  render() {
    return (
      <HeaderCommon
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
                  outlineColor={UI.Colors.grey30}
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
                  outlineColor={UI.Colors.grey30}
                />
              </UI.View>
            </UI.View>
          </UI.View>
        )}
        renderRight={() => (
          <UI.View row top flex marginT-8>
            <UI.View margin-8 marginR-10>
              <UI.Button
                backgroundColor={UI.Colors.grey50}
                iconSource={() => (
                  <Icon type={IconType.Ionicons} name="ios-refresh" size={25} />
                )}
              />
            </UI.View>
            <UI.View margin-8 marginR-20>
              <UI.Button
                backgroundColor={UI.Colors.grey50}
                iconSource={() => (
                  <Icon type={IconType.Ionicons} name="ios-search" size={25} />
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
