import {get} from 'lodash';
import {observer} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import React, {Component} from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import UI from 'react-native-ui-lib';
import {Category} from '../../store/category';
import {getWidth} from '../../utils';
import AccordionListItem from './AccordionListItem';
import {Icon} from '../Icon';
import {ScrollView} from 'react-native';

interface CategoryTreeListProps extends WithTranslation {
  categories: Instance<typeof Category>[];
  onPress?: (category: Instance<typeof Category>) => void;
}

export class CategoryTreeList extends Component<CategoryTreeListProps> {
  public render() {
    const {categories} = this.props;

    return (
      <UI.View>
        <ScrollView>
          {categories
            .filter((category) => !category.parent)
            .map((category) => this.renderItem(category))}
        </ScrollView>
      </UI.View>
    );
  }

  protected renderItem = (
    category: Instance<typeof Category>,
    deep: number = 0,
  ) => {
    const {categories} = this.props;
    const children = this.getChildCategories(category, categories);

    return children.length === 0 ? (
      <UI.TouchableOpacity
        key={category.id}
        onPress={() => this.handlePress(category)}
        row
        {...{[`marginL-${this.getLeftOffset(deep) + 8}`]: true}}
        margin-8>
        <UI.View br60 bg-grey40 padding-8>
          <Icon type={category.icon.type} name={category.icon.name} size={20} />
        </UI.View>
        <UI.View centerV>
          <UI.Text marginL-16 text70R>
            {this.props.t(category.name)}
          </UI.Text>
          <UI.Text marginL-16 text90L>
            {this.props.t(category.description)}
          </UI.Text>
        </UI.View>
      </UI.TouchableOpacity>
    ) : (
      <AccordionListItem
        key={category.id}
        title={this.props.t(category.name)}
        description={this.props.t(category.description)}
        {...{[`marginL-${this.getLeftOffset(deep) + 8}`]: true}}
        onPress={() => this.handlePress(category)}>
        {children.map((c) => this.renderItem(c, deep + 1))}
      </AccordionListItem>
    );
  };

  protected getChildCategories = (
    category: Instance<typeof Category>,
    categories: Instance<typeof Category>[],
  ) => {
    return categories.filter((c) => get(c, 'parent.id') === category.id);
  };

  protected handlePress = (category: Instance<typeof Category>) => {
    this.props.onPress && this.props.onPress(category);
  };

  protected getLeftOffset(deep: number) {
    return getWidth(5) * deep;
  }
}

export default observer(withTranslation()(CategoryTreeList));
