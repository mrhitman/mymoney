import { Breadcrumb, Card, Col, Popover, Row, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetWalletTransactionsQuery } from 'src/generated/graphql';
import { GetTransactionsQuery } from '../../generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';
import { TransactionAmount } from './TransactionAmount';

const WalletTransactions: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { params } = useRouteMatch<{ walletId: string }>();
  const { loading, data } = useGetWalletTransactionsQuery({
    variables: {
      walletId: params.walletId,
      limit: pageSize,
      offset: pageSize * (current - 1),
    },
    fetchPolicy: 'no-cache',
  });

  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/accounting">Wallets</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Operations for {data?.wallet.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col offset={20} />
        <Col span={4}>
          <Card>
            <Card.Meta
              title={data?.wallet.name}
              description={data?.wallet.description}
            />
          </Card>
        </Col>
      </Row>
      <Table
        bordered
        showSorterTooltip
        loading={loading}
        pagination={{
          position: ['topRight'],
          responsive: true,
          total: data?.transactions?.totalCount || 0,
          pageSize,
          current,
        }}
        onChange={(pagination) => {
          setCurrent(pagination.current || 1);
          setPageSize(pagination.pageSize || 1);
        }}
        dataSource={data?.transactions?.items || []}
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
        <Table.Column title="Type" dataIndex="type" key="type" />
        <Table.Column
          title="Currency"
          dataIndex="currency"
          key="currency"
          render={(currency) => `${currency.description} (${currency.name})`}
        />
        <Table.Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(category) => {
            return (
              <Row gutter={8}>
                <Col span={8}>
                  <CategoryIcon icon={category.icon} />
                </Col>
                <Col span={16}>{t(category.name)}</Col>
              </Row>
            );
          }}
        />
        <Table.Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          render={(
            _,
            record: GetTransactionsQuery['transactions']['items'][number],
          ) => <TransactionAmount record={record} />}
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
          width="24%"
          render={(desc) =>
            desc ? (
              desc
            ) : (
              <p style={{ color: 'grey', fontSize: '0.8em' }}>{'<NO INFO>'}</p>
            )
          }
        />
        <Table.Column
          title="Date"
          dataIndex="date"
          key="date"
          render={(date) => moment(date).format('LL')}
        />
      </Table>
    </>
  );
};

export default WalletTransactions;
