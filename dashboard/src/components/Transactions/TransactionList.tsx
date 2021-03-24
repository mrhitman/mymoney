import { EyeFilled } from '@ant-design/icons';
import { Col, Popover, Row, Table } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  TransactionFragment,
  TransactionType,
  useGetTransactionsQuery,
} from 'src/generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';
import { AddTransaction } from './AddTransaction';
import { FilterCriteries, FilterGroup } from './FilterGroup';
import { TransactionAmount } from './TransactionAmount';

interface Props {
  type: TransactionType;
}

const TransactionList: React.FC<Props> = ({ type }) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorter, setSorter] = useState<SorterResult<TransactionFragment>>({
    order: 'descend',
    field: 'date',
  });
  const [filters, setFilters] = useState<FilterCriteries>({
    search: undefined,
    range: undefined,
    categories: [],
    currencies: [],
    wallets: [],
    amountFrom: undefined,
    amountTo: undefined,
  });
  const [transactions, setTransactions] = useState<TransactionFragment[]>([]);
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
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (data?.transactions.items) {
      setTransactions(data.transactions.items);
    }
  }, [data, data?.transactions.items]);

  return (
    <>
      <FilterGroup
        onFilter={setFilters}
        onReset={() => setCurrent(1)}
        type={type}
      />
      <Row justify="end" gutter={[4, 12]}>
        <Col>
          <AddTransaction type={type} />
        </Col>
      </Row>
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
          setSorter(sorter as SorterResult<TransactionFragment>);
        }}
        dataSource={transactions}
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
          title={t('wallet')}
          render={(transaction) =>
            [
              transaction.sourceWallet?.name,
              transaction.destinationWallet?.name,
            ].join(' ')
          }
        />
        <Table.Column
          title={t('currency')}
          dataIndex="currency"
          key="currency"
          render={(currency) => `${currency.description} (${currency.name})`}
        />
        <Table.Column
          title={t('category')}
          dataIndex="category"
          key="category"
          render={(category) => (
            <Row gutter={8} key={category.id}>
              <Col span={8}>
                <CategoryIcon icon={category.icon} />
              </Col>
              <Col span={16}>{t(category.name)}</Col>
            </Row>
          )}
        />
        <Table.Column
          title={t('amount')}
          dataIndex="amount"
          key="amount"
          sorter
          render={(_, record: TransactionFragment) => (
            <TransactionAmount record={record} />
          )}
        />
        <Table.Column
          title={t('description')}
          dataIndex="description"
          key="description"
          width="24%"
          sorter
          render={(desc) =>
            desc ? (
              desc
            ) : (
              <p style={{ color: 'grey', fontSize: '0.8em' }}>{'<NO INFO>'}</p>
            )
          }
        />
        <Table.Column
          title={t('date')}
          dataIndex="date"
          key="date"
          sorter
          render={(date) => moment(date).format('LL')}
        />

        <Table.Column
          title={t('action')}
          dataIndex=""
          key="x"
          render={(_, record: TransactionFragment) => (
            <Link key={record.id} to={`/operation/${record.id}`}>
              <EyeFilled />
            </Link>
          )}
        />
      </Table>
    </>
  );
};

export default TransactionList;
