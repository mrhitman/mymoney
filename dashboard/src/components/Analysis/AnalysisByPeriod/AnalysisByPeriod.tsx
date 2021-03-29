import React, { FC } from 'react';
import { useGetStatisticByPeriod2Query } from 'src/generated/graphql';
import moment from 'moment';
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

const scale = {
  sales: {
    tickInterval: 600,
    nice: true,
  },
};

export const AnalysisByPeriod: FC = () => {
  const { data, loading } = useGetStatisticByPeriod2Query();
  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      height={500}
      data={data?.statisticByPeriod2.map((value) => ({
        year: value.date,
        type: value.name,
        sales: value.amount,
      }))}
      loading={loading}
      scale={scale}
    >
      <Tooltip showMarkers={false} />
      <Interval position="year*sales" color="type" adjust="stack" />
      <Interaction type="element-highlight" />
      <Interaction type="element-link" />
    </Chart>
  );
};
