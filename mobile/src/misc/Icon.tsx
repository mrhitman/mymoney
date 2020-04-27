import React, {PureComponent} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type IconType =
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'AntDesign'
  | 'FontAwesome'
  | 'Feather'
  | 'Ionicons'
  | 'Fontisto';

export class Icon extends PureComponent<IconProps & {type: IconType}> {
  protected types = {
    MaterialIcons,
    AntDesign,
    Feather,
    Fontisto,
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
  };

  public render() {
    const Component = this.types[this.props.type];
    Component.loadFont();

    return <Component {...this.props} />;
  }
}

export default Icon;
