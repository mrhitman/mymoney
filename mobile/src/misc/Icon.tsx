import React, {PureComponent} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';

export type IconType =
  | 'MaterialIcons'
  | 'AntDesign'
  | 'FontAwesome'
  | 'Feather';

export class Icon extends PureComponent<IconProps & {type: IconType}> {
  protected types = {
    MaterialIcons: MaterialIcons,
    AntDesign,
    Feather,
    FontAwesome: FontAwesomeIcons,
  };

  public render() {
    const Component = this.types[this.props.type];

    return <Component {...this.props} />;
  }
}

export default Icon;
