import { Popover, Table, Col, Row } from 'antd';
import React, { FC } from 'react';
import { useGetTransactionsQuery } from 'src/generated/graphql';
import Icon from 'src/components/misc/Icon';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface CategoryOperationsProps {
  from?: number;
  to?: number;
  walletIds: string[];
  categoryId: string;
}

const CategoryOperations: FC<CategoryOperationsProps> = (props) => {
  const { t } = useTranslation();
  const { loading, data } = useGetTransactionsQuery({
    variables: {
      categoryIds: [props.categoryId],
      from: props.from,
      to: props.to,
      walletIds: props.walletIds,
    },
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });
  return (
    <Table
      loading={loading}
      dataSource={data?.transactions.items}
      pagination={{
        pageSize: 3,
        position: ['topRight'],
      }}
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
        title="Wallet"
        render={(transaction) => {
          return [
            transaction.sourceWallet?.name,
            transaction.destinationWallet?.name,
          ].join(' ');
        }}
      />
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
                <div
                  className="category-icon"
                  style={{
                    backgroundColor: category.icon?.backgroundColor || 'grey',
                  }}
                >
                  <Icon
                    name={category.icon?.name || 'warning'}
                    type={category.icon?.type || 'AntDesign'}
                    color={'white'}
                    size={16}
                  />
                </div>
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
        render={(amount, record: any) => {
          switch (record.type) {
            case 'income':
              return (
                <div className={`tbl-${record.type}`}>
                  +{amount} {record.currency.symbol}
                </div>
              );
            case 'outcome':
              return (
                <div className={`tbl-${record.type}`}>
                  -{amount} {record.currency.symbol}
                </div>
              );
            case 'transfer':
              return (
                <div className={`tbl-${record.type}`}>
                  {amount} {record.currency.symbol}
                </div>
              );
          }
        }}
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
  );
};

export default CategoryOperations;
