import { CarryOutOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { InjectedStore } from '../../store/Store';
import Icon from 'src/components/misc/Icon';

class Categories extends PureComponent<
  Partial<InjectedStore> & WithTranslation
> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadCategories();
  };

  public render() {
    return <Tree showIcon treeData={this.getCategories()} />;
  }

  private getCategories = (parentId?: string) => {
    const categories = this.store.categories;

    if (parentId) {
      return categories
        .filter((c) => c.parent && c.parent.id === parentId)
        .map(this.categoryToLeaf);
    }

    return categories
      .filter(
        (c) => !['TRANSFER_IN', 'TRANSFER_OUT', 'SYSTEM_EMPTY'].includes(c.name)
      )
      .filter((c) => !c.parent)
      .map(this.categoryToLeaf);
  };

  private categoryToLeaf = (category: any): any => {
    return {
      key: category.id,
      title: this.props.t(category.name),
      icon: (
        <div
          className="category-icon"
          style={{ backgroundColor: category.icon.backgroundColor }}
        >
          <Icon
            name={category.icon.name}
            type={category.icon.type}
            color={'white'}
            size={12}
          />
        </div>
      ),
      children: this.getCategories(category.id),
    };
  };
}

export default withTranslation()(inject('store')(observer(Categories)));
