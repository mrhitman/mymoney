import React, {PureComponent} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type IconType =
  | 'MaterialIcons'
  | 'AntDesign'
  | 'FontAwesome'
  | 'Feather'
  | 'Ionicons';

export class Icon extends PureComponent<IconProps & {type: IconType}> {
  protected types = {
    MaterialIcons: MaterialIcons,
    AntDesign,
    Feather,
    Ionicons,
    FontAwesome: FontAwesomeIcons,
  };

  public render() {
    const Component = this.types[this.props.type];
    Component.loadFont();

    return <Component {...this.props} />;
  }
}

export default Icon;
