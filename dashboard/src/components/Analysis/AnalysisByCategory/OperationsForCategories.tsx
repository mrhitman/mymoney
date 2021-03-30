import { Col, Popover, Row, Table } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryIcon from 'src/components/misc/CategoryIcon';
import { TransactionAmount } from 'src/components/Transactions/TransactionAmount';
import {
  TransactionFragment,
  useGetTransactionsQuery,
} from 'src/generated/graphql';

interface Props {
  from?: number;
  to?: number;
  walletIds: string[];
  categoryId: string;
}

const OperationsForCategories: FC<Props> = (props) => {
  const { t } = useTranslation();
  const { loading, data } = useGetTransactionsQuery({
    variables: {
      categoryIds: [props.categoryId],
      from: props.from,
      to: props.to,
      walletIds: props.walletIds,
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
          record: Pick<TransactionFragment, 'currency' | 'amount' | 'type'>,
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
  );
};

export default OperationsForCategories;
