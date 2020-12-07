import React, { FC } from 'react';
import { useRouteMatch } from 'react-router';
import { useGetTransactionQuery } from '../../generated/graphql';

export const ViewTransaction: FC = () => {
  const { params } = useRouteMatch<{ trxId: string }>();
  const { data } = useGetTransactionQuery({
    variables: {
      id: params.trxId,
    },
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ViewTransaction;
