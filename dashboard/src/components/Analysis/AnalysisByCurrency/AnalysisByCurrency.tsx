import React, { FC } from 'react';
import { useGetStatisticByCurrencyQuery } from 'src/generated/graphql';

export const AnalysisByCurrency: FC = () => {
  const { data } = useGetStatisticByCurrencyQuery();

  return <pre>{JSON.stringify(data)}</pre>;
};

export default AnalysisByCurrency;
