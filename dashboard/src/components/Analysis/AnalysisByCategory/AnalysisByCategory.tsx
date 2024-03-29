import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  List,
  Menu,
  Row,
  Typography,
} from 'antd';
import {
  Axis,
  Chart,
  Coordinate,
  Interaction,
  Interval,
  Legend,
  Tooltip,
} from 'bizcharts';
import { round } from 'lodash';
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AnalysByCategoriesQuery,
  TransactionType,
  useAnalysByCategoriesQuery,
} from 'src/generated/graphql';
import OperationsForCategories from './OperationsForCategories';
import ranges from 'src/components/misc/DateRanges';

const cols = {
  percent: {
    formatter: (val: number) => round(val * 100, 2) + '%',
  },
};

function getSum(data?: AnalysByCategoriesQuery, disabledCategories?: string[]) {
  return data
    ? data.statisticByCategory.reduce(
        (acc, s) =>
          disabledCategories?.includes(s.category.id)
            ? acc
            : acc + Math.abs(s.amount),
        0,
      )
    : 1;
}

export const AnalysisByCategory: FC = () => {
  const { t } = useTranslation();
  const [from, setFrom] = useState<moment.Moment | null>(
    moment().subtract(1, 'week'),
  );
  const [to, setTo] = useState<moment.Moment | null>(moment());
  const [selected, setSelected] = useState<null | string>(null);
  const [type, setType] = useState(TransactionType.Outcome);
  const [walletIgnoreIds, setWalletIgnoreIds] = useState<string[]>([]);
  const [walletIds, setWalletIds] = useState<string[]>([]);
  const [disabledCategories, setDisabledCategories] = useState<string[]>([]);
  const { data, refetch } = useAnalysByCategoriesQuery({
    variables: {
      from: from?.unix(),
      to: to?.unix(),
      type,
      walletIds: walletIds.length ? walletIds : undefined,
    },
  });
  useEffect(() => {
    if (data?.wallets) {
      setWalletIds(
        walletIgnoreIds.length
          ? data.wallets
              .filter((w) => !walletIgnoreIds.includes(w.id))
              .map((w) => w.id)
          : [],
      );
    }
  }, [walletIgnoreIds]);
  const total = getSum(data, disabledCategories);
  return (
    <>
      <Row gutter={22}>
        <Col span={4}>
          <DatePicker.RangePicker
            showTime
            value={[from, to]}
            ranges={ranges}
            onCalendarChange={(values) => {
              setFrom(values?.[0] || null);
              setTo(values?.[1] || null);
            }}
          />
          <Divider />
          <List
            dataSource={data?.wallets}
            renderItem={(wallet) => (
              <List.Item key={wallet.id}>
                <Checkbox
                  checked={!walletIgnoreIds?.includes(wallet.id)}
                  onChange={(e) =>
                    setWalletIgnoreIds(
                      !e.target.checked
                        ? [...walletIgnoreIds, wallet.id]
                        : walletIgnoreIds.filter((id) => id !== wallet.id),
                    )
                  }
                >
                  {wallet.name} {wallet.description}
                </Checkbox>
              </List.Item>
            )}
          />
          <Divider />
          <Dropdown
            overlay={() => (
              <Menu>
                <Menu.Item
                  key="income"
                  onClick={() => setType(TransactionType.Income)}
                >
                  Income
                </Menu.Item>
                <Menu.Item
                  key="outcome"
                  onClick={() => setType(TransactionType.Outcome)}
                >
                  Outcome
                </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
            placement="bottomCenter"
          >
            <Button className="ant-dropdown-link" onClick={() => refetch()}>
              Show {type} categories
            </Button>
          </Dropdown>
          <Divider />
        </Col>
        <Col span={20}>
          <Row justify="center" align="middle">
            <Typography.Title level={3}>
              {t('total')}: {total.toFixed(2)} UAH
            </Typography.Title>
          </Row>
          <Row>
            <Chart
              height={global.screen.availHeight * 0.75}
              data={data?.statisticByCategory.map((s) => ({
                item: t(s.category.name),
                categoryId: s.category.id,
                count: round(Math.abs(s.amount), 2),
                percent: Math.abs(s.amount) / total,
              }))}
              onClick={(event: { data: { data: { categoryId: string } } }) =>
                setSelected(event?.data?.data?.categoryId)
              }
              scale={cols}
              autoFit
            >
              <Legend
                position="right"
                onChange={(event, chart) => {
                  if (event) {
                    const categoryLabel = event.item.name;
                    const categoryId = (chart as any).options.data.find(
                      (c: { item: string; categoryId: string }) =>
                        c.item === categoryLabel,
                    ).categoryId;
                    setDisabledCategories(
                      event.item.unchecked
                        ? [...disabledCategories, categoryId]
                        : disabledCategories.filter((id) => id !== categoryId),
                    );
                  }
                }}
              />
              <Coordinate type="theta" radius={0.75} />
              <Tooltip />
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
                    content: (data) =>
                      `${data.item}: ${round(data.count, 2)} UAH`,
                  },
                ]}
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Row>
          {selected && (
            <Drawer
              placement="bottom"
              visible={!!selected}
              height={400}
              keyboard
              closable
              onClose={() => {
                setSelected(null);
              }}
            >
              <OperationsForCategories
                from={from?.unix()}
                to={to?.unix()}
                walletIds={
                  data?.wallets
                    .map((w) => w.id)
                    .filter((id) => !walletIgnoreIds?.includes(id)) || []
                }
                categoryId={
                  data?.statisticByCategory.find(
                    (s) => s.category.id === selected,
                  )!.category.id!
                }
              />
            </Drawer>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AnalysisByCategory;
