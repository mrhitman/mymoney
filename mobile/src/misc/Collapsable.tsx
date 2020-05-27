import {IconType} from 'common/src/types/icon';
import React, {PureComponent} from 'react';
import {Text, View} from 'react-native-ui-lib';
import Icon from './Icon';

interface CollapsableProps {
  closed?: boolean;
  title: string;
}

interface CollapsableState {
  closed: boolean;
}

export class Collapsable extends PureComponent<
  CollapsableProps,
  CollapsableState
> {
  state: CollapsableState = {
    closed: this.props.closed || false,
  };

  render() {
    return (
      <View>
        <View
          top
          row
          margin-4
          onTouchStart={() => this.setState({closed: !this.state.closed})}>
          <Text margin-4 marginR-6>
            {this.props.title}
          </Text>
          <View marginT-2>
            <Icon
              type={IconType.Ionicons}
              name={'ios-arrow-' + (this.state.closed ? 'down' : 'up')}
              size={16}
            />
          </View>
        </View>
        {!this.state.closed && this.props.children}
      </View>
    );
  }
}

export default Collapsable;
