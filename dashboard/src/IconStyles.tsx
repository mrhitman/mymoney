import React, { PureComponent } from 'react';

export class IconStyles extends PureComponent {
  public render() {
    return (
      <style type="text/css">{`
              @font-face {
                font-family: 'MaterialIcons';
                src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'AntDesign';
                src: url(${require('react-native-vector-icons/Fonts/AntDesign.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'MaterialIcons';
                src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'Feather';
                src: url(${require('react-native-vector-icons/Fonts/Feather.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'Fontisto';
                src: url(${require('react-native-vector-icons/Fonts/Fontisto.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'FontAwesome';
                src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'Foundation';
                src: url(${require('react-native-vector-icons/Fonts/Foundation.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'Ionicons';
                src: url(${require('react-native-vector-icons/Fonts/Ionicons.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'EvilIcons';
                src: url(${require('react-native-vector-icons/Fonts/EvilIcons.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'Entypo';
                src: url(${require('react-native-vector-icons/Fonts/Entypo.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'Octicons';
                src: url(${require('react-native-vector-icons/Fonts/Octicons.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'MaterialCommunityIcons';
                src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'FontAwesome5_Solid';
                src: url(${require('react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf')}) format('truetype');
              }
              @font-face {
                font-family: 'FontAwesome5_Regular';
                src: url(${require('react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf')}) format('truetype');
              }
            `}</style>
    );
  }
}

export default IconStyles;
