import { Col, Popover, Row, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/components/misc/Icon';
import {
  GetTransactionsQuery,
  TransactionType,
  useGetTransactionsQuery,
} from 'src/generated/graphql';
import { TransactionAmount } from './TransactionAmount';
import { FilterGroup, FilterCriteries } from './FilterGroup';
import { SorterResult } from 'antd/lib/table/interface';

type Transaction = GetTransactionsQuery['transactions']['items'][number];
const TransactionList: React.FC<{ type?: TransactionType }> = ({ type }) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorter, setSorter] = useState<SorterResult<Transaction>>();
  const [filters, setFilters] = useState<FilterCriteries>({
    search: undefined,
    range: undefined,
    categories: [],
    currencies: [],
    wallets: [],
    amountFrom: undefined,
    amountTo: undefined,
  });
  const { loading, data } = useGetTransactionsQuery({
    variables: {
      type,
      walletIds: filters.wallets.length ? filters.wallets : undefined,
      categoryIds: filters.categories.length ? filters.categories : undefined,
      from: filters.range ? filters.range[0].unix() : undefined,
      to: filters.range ? filters.range[1].unix() : undefined,
      search: filters.search,
      amountGte: filters.amountFrom,
      amountLte: filters.amountTo,
      limit: pageSize,
      offset: pageSize * (current - 1),
      orderBy: sorter?.field as string,
      order: sorter?.order?.split('end')[0],
    },
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });
  const { t } = useTranslation();

  return (
    <>
      <FilterGroup onFilter={setFilters} onReset={() => setCurrent(1)} type={type} />
      <Table
        bordered
        showSorterTooltip
        loading={loading}
        pagination={{
          position: ['bottomRight'],
          responsive: true,
          total: data?.transactions?.totalCount || 0,
          pageSize,
          current,
        }}
        onChange={(pagination, filters, sorter) => {
          setCurrent(pagination.current || 1);
          setPageSize(pagination.pageSize || 1);
          setSorter(sorter as SorterResult<Transaction>);
        }}
        dataSource={data?.transactions?.items || []}
      >
        <Table.Column
          title="id"
          dataIndex="id"
          key="id"
          sorter
          render={(id) => (
            <Popover content={id}>
              <div>{id.slice(0, 3)}</div>
            </Popover>
          )}
        />
        <Table.Column
          title="Wallet"
          render={(transaction) =>
            [transaction.sourceWallet?.name, transaction.destinationWallet?.name].join(' ')
          }
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
          sorter
          render={(_, record: Transaction) => <TransactionAmount record={record} />}
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
          width="24%"
          sorter
          render={(desc) =>
            desc ? desc : <p style={{ color: 'grey', fontSize: '0.8em' }}>{'<NO INFO>'}</p>
          }
        />
        <Table.Column
          title="Date"
          dataIndex="date"
          key="date"
          sorter
          render={(date) => moment(date).format('LL')}
        />
      </Table>
    </>
  );
};

export default TransactionList;
