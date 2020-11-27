import { Skeleton } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { chain } from 'lodash';
import React, { FC } from 'react';
import {
  useGetStatisticByPeriodQuery,
  GetStatisticByPeriodQuery,
} from 'src/generated/graphql';
import moment from 'moment';

function prepareData(data?: GetStatisticByPeriodQuery) {
  type WH = Record<string, { amount: number; currency: string; date: string }>;

  return chain(data?.statisticByPeriod)
    .groupBy('createdAt')
    .map((walletHistory) =>
      Object.values(
        walletHistory.reduce<WH>((acc, wh) => {
          wh.pockets.forEach((p) =>
            p.currency.name in acc
              ? (acc[p.currency.name].amount += p.amount)
              : (acc[p.currency.name] = {
                  currency: p.currency.name,
                  amount: p.amount,
                  date: moment(wh.createdAt).format('L'),
                }),
          );
          return acc;
        }, {}),
      ),
    )
    .flatten()
    .value();
}

export const MainPage: FC = () => {
  const { loading, data } = useGetStatisticByPeriodQuery();

  return (
    <Skeleton loading={loading}>
      <Chart
        height={400}
        data={prepareData(data)}
        scale={{
          date: { range: [0, 1] },
        }}
        autoFit
      >
        <Legend />
        <Axis name="date" />
        <Axis name="amount" />
        <Tooltip
          useHtml
          g2-tooltip={{
            boxShadow: 'none',
            color: '#fff',
            backgroundColor: '#222',
          }}
          crosshairs={{ type: 'y' }}
          style={{ color: 'red' }}
        />
        <Geom
          type="line"
          position="date*amount"
          size={2}
          color={'currency'}
          shape={'smooth'}
        />
        <Geom
          type="point"
          position="date*amount"
          size={4}
          shape={'circle'}
          color={'currency'}
          style={{
            stroke: '#fff',
            lineWidth: 1,
          }}
        />
      </Chart>
    </Skeleton>
  );
};

export default MainPage;
