import { Skeleton } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { round } from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { GetStatisticByPeriodQuery, useGetStatisticByPeriodQuery } from 'src/generated/graphql';

function prepareData(data?: GetStatisticByPeriodQuery) {
  return data?.statisticByPeriod
    .map((s) => {
      const p = s.pockets.find((p) => p.currency.name === 'UAH');

      return {
        currency: p?.currency.name,
        amount: round(p?.amount || 0, 2),
        wallet: s.wallet.name,
        date: moment(s.createdAt).unix(),
      };
    })
    .sort((a, b) => a.date - b.date);
}

export const WalletsDinamic: FC = () => {
  const { loading, data } = useGetStatisticByPeriodQuery({
    variables: {
      from: moment().subtract(1, 'month').unix(),
    },
  });

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
        <Axis
          name="date"
          label={{
            formatter: (val) => moment.unix(+val).format('DD MMMM, Y'),
          }}
        />
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
        <Geom type="line" position="date*amount" size={2} color="wallet" />
        <Geom
          type="point"
          shape="circle"
          position="date*amount"
          size={4}
          color="wallet"
          style={{
            stroke: '#fff',
            lineWidth: 1,
          }}
        />
      </Chart>
    </Skeleton>
  );
};

export default WalletsDinamic;
