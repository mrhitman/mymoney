import { Axis, Chart, Coordinate, Interaction, Interval, Tooltip } from 'bizcharts';
import { round } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AnalysByCategoriesQuery,
  TransactionType, useAnalysByCategoriesLazyQuery
} from 'src/generated/graphql';

const cols = {
  percent: {
    formatter: (val: number) => round(val * 100, 2) + '%',
  },
};

function getSum(data?: AnalysByCategoriesQuery) {
  return data ? data.statisticByCategory.reduce((acc, s) => acc + Math.abs(s.amount), 0) : 1;
}

export const CategoriesDinamic: FC = () => {
  const { t } = useTranslation();
  const [getData, { data }] = useAnalysByCategoriesLazyQuery({
    variables: {
      from: moment().subtract(1, 'month').unix(),
      type: TransactionType.Outcome,
    },
  });

  useEffect(getData, []);

  return (
    <Chart
      height={400}
      data={data?.statisticByCategory.map((s) => ({
        item: t(s.category.name),
        count: round(Math.abs(s.amount), 2),
        percent: Math.abs(s.amount) / getSum(data),
      }))}
      scale={cols}
      autoFit
    >
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        color="item"
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={[
          'count',
          {
            content: (data) => `${data.item}: ${round(data.percent * 100, 2)}%`,
          },
        ]}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  );
};

export default CategoriesDinamic;
