import React, { FC } from 'react';
import { useGetStatisticByCurrencyQuery } from 'src/generated/graphql';

export const AnalysisByCurrency: FC = () => {
  const { data } = useGetStatisticByCurrencyQuery({
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });

  return (<pre>
    {JSON.stringify(data)}
  </pre>);
};

export default AnalysisByCurrency;
