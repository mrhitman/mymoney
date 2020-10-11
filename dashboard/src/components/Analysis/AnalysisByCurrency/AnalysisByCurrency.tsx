import React, { FC } from 'react';
import { useGetStatisticByCurrencyQuery } from 'src/generated/graphql';
import { VictoryPie } from 'victory';

export const AnalysisByCurrency: FC = () => {
  const { data } = useGetStatisticByCurrencyQuery({
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });

  return (
    <VictoryPie
      padAngle={0.5}
      colorScale="qualitative"
      labelRadius={90}
      labelPosition="centroid"
      data={data?.statisticByCurrency.map((stat) => ({
        x: stat.currency.description + ' (' + stat.currency.name + ')',
        y: stat.amount,
      }))}
    />
  );
};

export default AnalysisByCurrency;
