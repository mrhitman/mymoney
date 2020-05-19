import {Category} from 'common/category';
import {observer} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import UI from 'react-native-ui-lib';
import Icon from './Icon';

interface CategoryIconProps {
  style?: StyleProp<ViewStyle>;
  category: Instance<typeof Category>;
}

export class CategoryIcon extends PureComponent<CategoryIconProps> {
  public render() {
    const {category, style} = this.props;

    return (
      <UI.View
        br60
        bg-grey40
        padding-8
        center
        style={[
          styles.icon,
          {
            backgroundColor: category.icon.backgroundColor,
          },
          style,
        ]}>
        <Icon
          type={category.icon.type}
          name={category.icon.name}
          size={20}
          color="white"
        />
      </UI.View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
  },
});

export default observer(CategoryIcon);
