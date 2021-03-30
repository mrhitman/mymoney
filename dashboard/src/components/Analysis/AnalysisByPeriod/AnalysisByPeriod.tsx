import React, { FC } from 'react';
import { useGetStatisticByPeriod2Query } from 'src/generated/graphql';
import { range } from 'lodash';
import {
  Chart,
  Interval,
  Interaction,
  registerInteraction,
  Tooltip,
} from 'bizcharts';
import moment from 'moment';

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
      autoFit={false}
      height={500}
      data={range(70)
        .map((day) => {
          const date = moment().subtract(day, 'd');
          return {
            date: date.format('M/D/yyyy'),
            unix: date.unix(),
            amount: 0,
            name: 'income',
          };
        })
        .concat(
          data?.statisticByPeriod2.map((s) => ({
            ...s,
            unix: moment(s.date, 'M/D/yyyy').unix(),
          })) || [],
        )
        .sort((a, b) => a.unix - b.unix)}
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
