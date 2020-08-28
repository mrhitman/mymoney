import { useQuery } from '@apollo/client';
import { Popover, Table, Skeleton } from 'antd';
import { loader } from 'graphql.macro';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/components/misc/Icon';
import { GetTransactionsQuery } from 'src/generated/graphql';

const TransactionsQuery = loader('src/queries/transactions.graphql');
const TransactionList: React.FC<{ type?: 'income' | 'outcome' }> = ({
  type,
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { loading, data, error } = useQuery<GetTransactionsQuery>(
    TransactionsQuery,
    { variables: { type, limit: pageSize, offset: pageSize * current } },
  );

  const { t } = useTranslation();
  return (
    <Table
      bordered
      showSorterTooltip
      loading={loading}
      pagination={{
        position: ['topRight'],
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
            <div>
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
                  size={12}
                />
              </div>
              {t(category.name)}
            </div>
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

export default TransactionList;
