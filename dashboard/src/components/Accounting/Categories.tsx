import {Tree} from 'antd';
import {Category} from 'common';
import {Instance} from 'mobx-state-tree';
import React, {PureComponent} from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import Icon from 'src/components/misc/Icon';

class Categories extends PureComponent<WithTranslation> {
  public render() {
    return <Tree showIcon treeData={this.getCategories()} />;
  }

  private getRootCategories = () => {
    const categories = [] as any[];
    return categories
        .filter(
            (c) => !['TRANSFER_IN', 'TRANSFER_OUT', 'SYSTEM_EMPTY'].includes(c.name),
        )
        .filter((c) => !c.parent);
  };

  private getCategories = (parentId?: string) => {
    const categories = [] as any[];

    if (parentId) {
      return categories
          .filter((c) => c.parent && c.parent.id === parentId)
          .map(this.categoryToLeaf);
    }

    return this.getRootCategories().map(this.categoryToLeaf);
  };

  private categoryToLeaf = (category: Instance<typeof Category>): any => {
    return {
      key: category.id,
      title: this.props.t(category.name),
      icon: (
        <div>
          <div
            className="category-icon"
            style={{
              backgroundColor: category.icon.backgroundColor,
            }}
          >
            <Icon
              name={category.icon.name}
              type={category.icon.type}
              color={'white'}
              size={14}
            />
          </div>
        </div>
      ),
      children: this.getCategories(category.id),
    };
  };
}

export default withTranslation()(Categories);
