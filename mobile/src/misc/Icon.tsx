import {IconType} from 'common/types/icon';
import React, {PureComponent} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

export class Icon extends PureComponent<IconProps & {type: IconType}> {
  protected types = {
    MaterialIcons,
    AntDesign,
    Feather,
    Fontisto,
    FontAwesome5,
    Foundation,
    Ionicons,
    EvilIcons,
    FontAwesome,
    Entypo,
    Octicons,
    MaterialCommunityIcons,
  };

  public render() {
    const Component = this.types[this.props.type];

    if ('loadFont' in Component) {
      Component.loadFont();
    }

    return <Component {...this.props} />;
  }
}

export default Icon;
