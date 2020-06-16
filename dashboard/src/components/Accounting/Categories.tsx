import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { InjectedStore } from '../../store/Store';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-0-0-1', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
];

class Categories extends PureComponent<Partial<InjectedStore>> {
  public get store() {
    return this.props.store!;
  }

  public componentDidMount = async () => {
    await this.store.loadCategories();
  };

  public render() {
    return (
      <Tree showIcon defaultExpandedKeys={['0-0-0']} treeData={treeData} />
    );
  }
}

export default inject('store')(observer(Categories));
