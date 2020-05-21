import { SmileOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { GetCategoryResponse } from 'common/responses';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

interface CategoriesState {
  categories: GetCategoryResponse[];
}

class Categories extends PureComponent<
  Partial<InjectedStore>,
  CategoriesState
> {
  public state: CategoriesState = {
    categories: [],
  };

  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    const categories = await this.getCategories();
    this.setState({ categories });
  };

  public render() {
    return (
      <Tree
        showIcon
        defaultExpandAll
        treeData={this.getData(this.state.categories.filter((c) => !c.parent))}
      />
    );
  }

  protected getData = (categories: GetCategoryResponse[]): any => {
    const allCategories = this.state.categories;

    return categories.map((category: GetCategoryResponse) => {
      return {
        title: category.name,
        key: category.id,
        icon: <SmileOutlined />,
        children: this.getData(
          allCategories.filter((s) => s.parent === category.id),
        ),
      };
    });
  };

  protected getCategories = async () => {
    const categories = await this.store.getCategories();

    return categories.filter(
      (c) => !['TRANSFER_IN', 'TRANSFER_OUT', 'TRANSFER_SYS'].includes(c.name),
    );
  };
}

export default inject('store')(observer(Categories));
