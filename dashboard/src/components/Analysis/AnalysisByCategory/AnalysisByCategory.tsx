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
} from 'antd';
import { Axis, Chart, Coordinate, Interaction, Interval, Legend, Tooltip } from 'bizcharts';
import { round } from 'lodash';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AnalysByCategoriesQuery,
  TransactionType,
  useAnalysByCategoriesQuery,
} from 'src/generated/graphql';
import OperationsForCategories from './OperationsForCategories';

const cols = {
  percent: {
    formatter: (val: number) => round(val * 100, 2) + '%',
  },
};

function getSum(data?: AnalysByCategoriesQuery) {
  return data ? data.statisticByCategory.reduce((acc, s) => acc + Math.abs(s.amount), 0) : 1;
}

export const AnalysisByCategory: FC = () => {
  const { t } = useTranslation();
  const [from, setFrom] = useState<moment.Moment | null>(moment().subtract(1, 'week'));
  const [to, setTo] = useState<moment.Moment | null>(moment());
  const [selected, setSelected] = useState<null | string>(null);
  const [type, setType] = useState(TransactionType.Outcome);
  const [walletIgnoreIds, setWalletIgnoreIds] = useState<string[]>([]);
  const { data, refetch } = useAnalysByCategoriesQuery({
    variables: {
      from: from?.unix(),
      to: to?.unix(),
      type,
      walletIds: walletIgnoreIds.length ? walletIgnoreIds : undefined,
    },
  });
  const total = getSum(data);
  return (
    <>
      <Row gutter={22}>
        <Col span={4}>
          <DatePicker.RangePicker
            showTime
            value={[from, to]}
            ranges={{
              Today: [moment().utc().startOf('day'), moment().utc().endOf('day')],
              'This Week': [moment().utc().startOf('week'), moment().utc().endOf('week')],
              'This Month': [moment().utc().startOf('month'), moment().utc().endOf('month')],
              'Last 7 Days': [moment().utc().subtract(7, 'days'), moment().endOf('day')],
              'Last 30 Days': [moment().utc().subtract(30, 'days'), moment().utc().endOf('day')],
            }}
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
                <Menu.Item key="income" onClick={() => setType(TransactionType.Income)}>
                  Income
                </Menu.Item>
                <Menu.Item key="outcome" onClick={() => setType(TransactionType.Outcome)}>
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
            <Legend position="top" />
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
                  content: (data) => `${data.item}: ${round(data.count, 2)} UAH`,
                },
              ]}
            />
            <Interaction type="element-single-selected" />
          </Chart>
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
                  data?.wallets.map((w) => w.id).filter((id) => !walletIgnoreIds?.includes(id)) ||
                  []
                }
                categoryId={
                  data?.statisticByCategory.find((s) => s.category.id === selected)!.category.id!
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
