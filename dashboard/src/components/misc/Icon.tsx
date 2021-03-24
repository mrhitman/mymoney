import { QuestionCircleFilled } from '@ant-design/icons';
import React, { FC } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

type IconGeneric =
  | typeof MaterialIcons
  | typeof AntDesign
  | typeof Feather
  | typeof Fontisto
  | typeof FontAwesome5
  | typeof Foundation
  | typeof Ionicons
  | typeof EvilIcons
  | typeof FontAwesome
  | typeof Entypo
  | typeof Octicons
  | typeof MaterialCommunityIcons;

interface Props {
  name: string;
  type:
    | 'MaterialIcons'
    | 'AntDesign'
    | 'Feather'
    | 'Fontisto'
    | 'FontAwesome5'
    | 'Foundation'
    | 'Ionicons'
    | 'EvilIcons'
    | 'FontAwesome'
    | 'Entypo'
    | 'Octicons'
    | 'MaterialCommunityIcons'
    | string;
  key?: string;
  color?: string;
  size?: number;
}

export const Icon: FC<Props> = (props) => {
  const types: Record<string, IconGeneric> = {
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

  const Component = types[props.type];
  return Component ? (
    <Component {...props} />
  ) : (
    <QuestionCircleFilled key={props.key} />
  );
};

export default Icon;
