import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from 'react-native-ui-lib';

export type HeaderSize = 'sm' | 'md' | 'lg' | 'xlg';
export enum HeaderSizes {
  sm = 30,
  md = 50,
  lg = 70,
  xlg = 110,
}
export interface HeaderProps {
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: HeaderSize;
}

export class Header extends PureComponent<HeaderProps> {
  public render() {
    return (
      <View
        bg-dark70
        row
        spread
        style={[styles[this.props.size || 'md'], this.props.style]}>
        <View left center>
          {this.props.renderLeft && this.props.renderLeft()}
        </View>
        <View center flexG>
          {this.props.children}
        </View>
        <View right center>
          {this.props.renderRight && this.props.renderRight()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sm: {
    height: HeaderSizes.sm,
  },
  md: {
    height: HeaderSizes.md,
  },
  lg: {
    height: HeaderSizes.lg,
  },
  xlg: {
    height: HeaderSizes.xlg,
  },
});

export default Header;
