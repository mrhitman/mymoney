import { Popover, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery } from 'src/generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';

export const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data } = useGetCategoriesQuery({
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });
  return (
    <Table
      bordered
      showSorterTooltip
      loading={loading}
      dataSource={
        data?.categories?.filter(
          (c) => !['TRANSFER_IN', 'TRANSFER_OUT', 'TRANSFER_SYS', 'SYSTEM_EMPTY'].includes(c.name),
        ) || []
      }
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
      <Table.Column title={t('name')} dataIndex="name" key="name" render={(name) => t(name)} />
      <Table.Column
        title={t('icon')}
        dataIndex="icon"
        key="icon"
        render={(icon) => <CategoryIcon icon={icon} />}
      />
      <Table.Column title={t('type')} dataIndex="type" key="type" />
    </Table>
  );
};

export default Categories;
