import {IconType} from 'common/src/types/icon';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import UI from 'react-native-ui-lib';
import Collapsable from '../../misc/Collapsable';
import Icon from '../../misc/Icon';

export class Banks extends PureComponent {
  render() {
    return (
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
                  <UI.Button
                    backgroundColor={UI.Colors.white}
                    iconSource={() => (
                      <Icon
                        type={IconType.FontAwesome}
                        name="repeat"
                        size={18}
                      />
                    )}
                  />
                </UI.View>
              </UI.Card>
            ))}
          </UI.View>
        </ScrollView>
      </Collapsable>
    );
  }
}

export default Banks;
