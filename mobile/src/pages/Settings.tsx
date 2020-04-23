import React, {PureComponent} from 'react';
import {Button, View} from 'react-native-ui-lib';

export class Settings extends PureComponent {
  render() {
    return (
      <View useSafeArea>
        <View flex top>
          <Button label="THIS is button" />
        </View>
      </View>
    );
  }
}

export default Settings;
