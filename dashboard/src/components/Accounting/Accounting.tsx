import { useQuery } from '@apollo/client';
import { Skeleton, Card, List, Typography, Divider } from 'antd';
import { loader } from 'graphql.macro';
import React, { FC } from 'react';

const WalletsQuery = loader('src/queries/wallets.graphql');

export const Accounting: FC = () => {
  const { loading, error, data } = useQuery(WalletsQuery);
  const wallets = data?.wallets || [];

  return (
    <Skeleton loading={loading}>
      {wallets.map((wallet: any) => {
        return (
          <Card
            id={wallet.id}
            style={{ width: 300, marginTop: 16 }}
            loading={loading}
          >
            <Card.Meta title={wallet.name} description={wallet.description} />
            <Divider />
            <List
              dataSource={wallet.pockets}
              renderItem={(pocket: any) => (
                <Typography>
                  {pocket.currency.symbol} {pocket.amount}{' '}
                  {pocket.currency.name}
                </Typography>
              )}
            />
          </Card>
        );
      })}
    </Skeleton>
  );
};

export default Accounting;
