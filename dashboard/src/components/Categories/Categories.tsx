import { DeleteFilled } from '@ant-design/icons';
import { Col, Popover, Row, Space, Table } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryFragment, useGetCategoriesQuery } from 'src/generated/graphql';
import { GetCategoriesQuery } from '../../generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const { loading, data } = useGetCategoriesQuery();
  const [sorter, setSorter] = useState<SorterResult<CategoryFragment>>({
    order: 'descend',
    field: 'name',
  });
  return (
    <Row>
      <Col offset={22} span={2} style={{ marginBottom: 10 }}>
        <AddCategory />
      </Col>
      <Col span={24}>
        <Table
          bordered
          showSorterTooltip
          loading={loading}
          onChange={(pagination, filters, sorter) => {
            setSorter(sorter as SorterResult<CategoryFragment>);
          }}
          dataSource={
            data?.categories
              ?.filter(
                (c) =>
                  ![
                    'TRANSFER_IN',
                    'TRANSFER_OUT',
                    'TRANSFER_SYS',
                    'SYSTEM_EMPTY',
                  ].includes(c.name),
              )
              .sort((a: any, b: any) => {
                return (
                  (sorter.order === 'descend' ? -1 : 1) *
                  String(a[sorter.columnKey || 'id']).localeCompare(
                    String(b[sorter.columnKey || 'id']),
                  )
                );
              }) || []
          }
        >
          <Table.Column
            title="id"
            sorter
            dataIndex="id"
            key="id"
            render={(id) => (
              <Popover content={id}>
                <div>{id.slice(0, 3)}</div>
              </Popover>
            )}
          />
          <Table.Column
            sorter
            title={t('name')}
            dataIndex="name"
            key="name"
            render={(name) => t(name)}
          />
          <Table.Column
            title={t('icon')}
            dataIndex="icon"
            key="icon"
            render={(icon) => <CategoryIcon icon={icon} />}
          />
          <Table.Column
            sorter
            title={t('type')}
            dataIndex="type"
            key="type"
            filters={[
              {
                text: t('income'),
                value: 'income',
              },
              {
                text: t('outcome'),
                value: 'outcome',
              },
            ]}
            onFilter={(
              value,
              record: GetCategoriesQuery['categories'][number],
            ) => record.type === value}
            render={(type) => t(type)}
          />
          <Table.Column
            title={t('action')}
            dataIndex=""
            key="x"
            render={(_, record: CategoryFragment) => (
              <Space size={8}>
                <EditCategory category={record} />
                <DeleteFilled />
              </Space>
            )}
          />
        </Table>
      </Col>
    </Row>
  );
};

export default Categories;
