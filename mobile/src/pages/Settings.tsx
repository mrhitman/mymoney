import React, {PureComponent} from 'react';
import UI from 'react-native-ui-lib';

export class Settings extends PureComponent {
  render() {
    return (
      <UI.View useSafeArea>
        <UI.View flex top>
          <UI.ActionBar/>
        </UI.View>
      </UI.View>
    );
  }
}

export default Settings;
