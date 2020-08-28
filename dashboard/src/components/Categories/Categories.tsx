import { useQuery } from '@apollo/client';
import { Popover, Table } from 'antd';
import { loader } from 'graphql.macro';
import Icon from 'src/components/misc/Icon'
import React from 'react';
import { GetCategoriesQuery } from 'src/generated/graphql';
import { useTranslation } from 'react-i18next';

const CategoriesQuery = loader('src/queries/categories.graphql')
export const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useQuery<GetCategoriesQuery>(
    CategoriesQuery,
  );
  return (<Table
    bordered
    showSorterTooltip
    loading={loading}
    dataSource={data?.
      categories?.
      filter(c => !['TRANSFER_IN', 'TRANSFER_OUT', 'TRANSFER_SYS', 'SYSTEM_EMPTY'].includes(c.name)) || []}
  >
    <Table.Column
      title="id"
      dataIndex="id"
      key="id"
      render={(id) => (
        <Popover content={id}>
          <div>{id.slice(0, 3)}</div>
        </Popover>
      )}
    />
    <Table.Column
      title="Icon"
      dataIndex="icon"
      key="icon"
      render={(icon) => {
        return (
          <div
            className="category-icon"
            style={{
              backgroundColor: icon?.backgroundColor || 'grey',
            }}
          >
            <Icon
              name={icon?.name || 'warning'}
              type={icon?.type || 'AntDesign'}
              color={'white'}
              size={16}
            />
          </div>
        );
      }}
    />
    <Table.Column title="Type" dataIndex="type" key="type" />
    <Table.Column title="Name" dataIndex="name" key="name" render={name => t(name)} />
  </Table>)
}

export default Categories;

