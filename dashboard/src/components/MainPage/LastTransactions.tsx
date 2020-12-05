import { List, Typography } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import Icon from 'src/components/misc/Icon';
import { useGetTransactionsQuery } from 'src/generated/graphql';
import { TransactionAmount } from '../Transactions/TransactionAmount';

export const LastTransactions: FC<{ count: number }> = ({ count }) => {
  const { loading, data } = useGetTransactionsQuery({
    variables: {
      limit: count,
      order: 'desc',
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
            avatar={
              <div
                className="category-icon"
                style={{
                  backgroundColor: item.category.icon?.backgroundColor || 'grey',
                }}
              >
                <Icon
                  name={item.category.icon?.name || 'warning'}
                  type={item.category.icon?.type || 'AntDesign'}
                  color={'white'}
                  size={16}
                />
              </div>
            }
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
