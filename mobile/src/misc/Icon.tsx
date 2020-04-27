import React, {PureComponent} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type IconType =
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'AntDesign'
  | 'EvilIcons'
  | 'FontAwesome'
  | 'Feather'
  | 'Foundation'
  | 'Ionicons'
  | 'Fontisto';

export class Icon extends PureComponent<IconProps & {type: IconType}> {
  protected types = {
    MaterialIcons,
    AntDesign,
    Feather,
    Fontisto,
    Foundation,
    Ionicons,
    EvilIcons,
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
