import React, { FC } from 'react';
import { useGetActiveBudgetQuery } from 'src/generated/graphql';

const ActiveBudget: FC = () => {
  const { data } = useGetActiveBudgetQuery();
  return <div>{JSON.stringify(data)}</div>;
};

export default ActiveBudget;
