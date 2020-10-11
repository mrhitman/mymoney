import { SyncOutlined } from '@ant-design/icons';
import {
  Dropdown,
  Menu,
  Button,
  Row,
  List,
  Col,
  Spin,
  DatePicker,
  Checkbox,
  Drawer,
} from 'antd';
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionType,
  useAnalysByCategoriesLazyQuery,
} from 'src/generated/graphql';
import { VictoryPie, VictoryLegend } from 'victory';
import CategoryOperations from './CategoryOperations';
import { round } from 'lodash';

export const AnalysisByCategory: FC = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.Outcome);
  const [from, setFrom] = useState<moment.Moment | null>(
    moment().subtract(1, 'week'),
  );
  const [to, setTo] = useState<moment.Moment | null>(moment());
  const [focused, setFocused] = useState<any | undefined>();
  const [selected, setSelected] = useState<any | undefined>();
  const [walletIgnoreIds, setWalletIgnoreIds] = useState<string[]>([]);
  const { t } = useTranslation();

  const [getData, { data, loading }] = useAnalysByCategoriesLazyQuery();
  const total =
    data?.statisticByCategory.reduce(
      (acc, item) => acc + Math.abs(item.amount),
      0,
    ) || 0;

  const doRefetch = () => {
    getData({
      variables: {
        type,
        from: from?.unix(),
        to: to?.unix(),
        walletIds: data?.wallets
          .map((w) => w.id)
          .filter((id) => !walletIgnoreIds.includes(id)),
      },
      context: {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      },
    });
  };

  useEffect(doRefetch, []);
  return (
    <>
      <Row>
        <Col span={6}>
          <Row>
            <Col>
              <DatePicker.RangePicker
                showTime
                value={[from, to]}
                ranges={{
                  Today: [
                    moment().utc().startOf('day'),
                    moment().utc().endOf('day'),
                  ],
                  'This Week': [
                    moment().utc().startOf('week'),
                    moment().utc().endOf('week'),
                  ],
                  'This Month': [
                    moment().utc().startOf('month'),
                    moment().utc().endOf('month'),
                  ],
                  'Last 7 Days': [
                    moment().utc().subtract(7, 'days'),
                    moment().endOf('day'),
                  ],
                  'Last 30 Days': [
                    moment().utc().subtract(30, 'days'),
                    moment().utc().endOf('day'),
                  ],
                }}
                onCalendarChange={(values) => {
                  setFrom(values?.[0] || null);
                  setTo(values?.[1] || null);
                }}
              />
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
                <Button className="ant-dropdown-link" onClick={doRefetch}>
                  {type}
                </Button>
              </Dropdown>
              <Button>
                <SyncOutlined />
              </Button>
            </Col>
            <Col span={24}>
              <List
                bordered
                dataSource={data?.wallets}
                footer={<Button onClick={doRefetch}>{t('apply')}</Button>}
                renderItem={(wallet) => (
                  <List.Item key={wallet.id}>
                    <Checkbox
                      checked={!walletIgnoreIds.includes(wallet.id)}
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
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <Row
            align="middle"
            justify="center"
            gutter={[10, 10]}
            style={{ marginBottom: -200 }}
          >
            <Col>
              <VictoryLegend
                title={`Spends by categories (total: ${data?.statisticByCategory
                  .reduce((acc, v) => acc + v.amount, 0)
                  .toFixed(2)} UAH)`}
                centerTitle
                orientation="horizontal"
                itemsPerRow={3}
                width={425}
                colorScale="qualitative"
                gutter={20}
                style={{
                  title: { fontSize: 18 },
                  labels: { fontSize: 14 },
                }}
                data={data?.statisticByCategory.map((item) => ({
                  name: t(item.category.name),
                }))}
              />
            </Col>
          </Row>
          <Row align="middle" justify="center" gutter={[10, 10]}>
            <Col span={15}>
              <Spin spinning={loading}>
                <VictoryPie
                  animate
                  padAngle={0.5}
                  colorScale="qualitative"
                  labelRadius={90}
                  labelPosition="centroid"
                  style={{ labels: { fill: 'black', fontSize: 10 } }}
                  events={[
                    {
                      target: 'labels',
                      eventHandlers: {
                        onClick: () => [
                          {
                            target: 'data',
                            mutation: (data) => setSelected(data),
                          },
                        ],
                      },
                    },
                    {
                      target: 'data',
                      eventHandlers: {
                        onClick: () => [
                          {
                            target: 'data',
                            mutation: (data) => setSelected(data),
                          },
                        ],
                        onMouseOver: () => [
                          {
                            target: 'data',
                            mutation: (data) => setFocused(data),
                          },
                        ],
                      },
                    },
                  ]}
                  data={data?.statisticByCategory.map((data) => ({
                    x: data.category.name,
                    y: Math.abs(data.amount),
                    category: data.category,
                    isFocused:
                      data?.category?.name === focused?.datum?.category?.name,
                    amount: data.amount,
                  }))}
                  labels={({ datum }) =>
                    datum.isFocused || datum.y / total > 0.14
                      ? `${t(datum.x)} Σ${round(datum.y, 1)}`
                      : ''
                  }
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
      {selected?.datum?.category && (
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
          <CategoryOperations
            from={from?.unix()}
            to={to?.unix()}
            walletIds={
              data?.wallets
                .map((w) => w.id)
                .filter((id) => !walletIgnoreIds.includes(id)) || []
            }
            categoryId={
              data?.statisticByCategory.find(
                (s) => s.category.name === selected?.datum?.category?.name,
              )!.category.id!
            }
          />
        </Drawer>
      )}
    </>
  );
};
