import { Button, Col, Popover, Row, Table } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery } from 'src/generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';
import AddCategory from './AddCategory';

export const Categories: FC = () => {
  const { t } = useTranslation();
  const { loading, data } = useGetCategoriesQuery();
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
          dataSource={
            data?.categories?.filter(
              (c) =>
                !['TRANSFER_IN', 'TRANSFER_OUT', 'TRANSFER_SYS', 'SYSTEM_EMPTY'].includes(c.name),
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
      </Col>
    </Row>
  );
};

export default Categories;
