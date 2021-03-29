import React, { FC } from 'react';
import { useGetStatisticByPeriod2Query } from 'src/generated/graphql';
import {
  Chart,
  Interval,
  Interaction,
  registerInteraction,
  Tooltip,
} from 'bizcharts';

registerInteraction('element-link', {
  start: [
    { trigger: 'interval:mouseenter', action: 'element-link-by-color:link' },
  ],
  end: [
    { trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' },
  ],
});

export const AnalysisByPeriod: FC = () => {
  const { data, loading } = useGetStatisticByPeriod2Query();
  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      height={500}
      data={data?.statisticByPeriod2}
      loading={loading}
      scale={{
        amount: {
          tickInterval: 600,
          nice: true,
        },
      }}
    >
      <Tooltip showMarkers={false} />
      <Interval position="date*amount" color="name" adjust="stack" />
      <Interaction type="element-highlight" />
      <Interaction type="element-link" />
    </Chart>
  );
};
