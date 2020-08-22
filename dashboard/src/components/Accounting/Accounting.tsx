import {useQuery} from '@apollo/client';
import {Skeleton} from 'antd';
import {loader} from 'graphql.macro';
import React, {FC} from 'react';

const WalletsQuery = loader('src/queries/wallets.graphql');

export const Accounting: FC = () => {
  const {loading, error, data: wallets} = useQuery(WalletsQuery);

  if (loading) {
    return <Skeleton />;
  }

  return <div >
    <pre>
      {JSON.stringify(wallets, null, 2)}
    </pre>
  </div>;
};

export default Accounting;
