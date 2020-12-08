import { List, Typography } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { useGetTransactionsQuery } from 'src/generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';
import { TransactionAmount } from '../Transactions/TransactionAmount';

export const LastTransactions: FC<{ count: number }> = ({ count }) => {
  const { loading, data } = useGetTransactionsQuery({
    variables: {
      limit: count,
      order: 'desc',
      orderBy: 'date',
    },
  });

  return (
    <List
      header={<Typography.Title level={4}>Last {count} transactions</Typography.Title>}
      loading={loading}
      size="small"
      itemLayout="horizontal"
      dataSource={data?.transactions.items}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={`${item.description} (${(item.sourceWallet || item.destinationWallet)?.name})`}
            description={moment(item.date).format('LLL')}
            avatar={<CategoryIcon icon={item.category.icon} />}
          />
          <div>
            <TransactionAmount record={item} />
          </div>
        </List.Item>
      )}
    />
  );
};

export default LastTransactions;
