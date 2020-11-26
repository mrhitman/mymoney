import { SyncOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Dropdown,
  List,
  Menu,
  Row,
  Spin,
} from 'antd';
import { DonutChart } from 'bizcharts';
import { round } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionType,
  useAnalysByCategoriesLazyQuery,
} from 'src/generated/graphql';
import CategoryOperations from './CategoryOperations';

export const AnalysisByCategory: FC = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.Outcome);
  const [from, setFrom] = useState<moment.Moment | null>(
    moment().subtract(1, 'week'),
  );
  const [to, setTo] = useState<moment.Moment | null>(moment());
  const [selected, setSelected] = useState<any | undefined>();
  const [walletIgnoreIds, setWalletIgnoreIds] = useState<string[]>([]);
  const { t } = useTranslation();

  const [getData, { data, loading }] = useAnalysByCategoriesLazyQuery();
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
          <Row align="middle" justify="center" gutter={[10, 10]}>
            <Col span={15}>
              <Spin spinning={loading}>
                <DonutChart
                  animation={false}
                  events={{
                    onRingClick: (event) => setSelected(event.data.id),
                  }}
                  data={
                    data?.statisticByCategory.map((item) => ({
                      id: item.category.id,
                      type: t(item.category.name) as string,
                      value: round(Math.abs(item.amount), 1),
                    })) || []
                  }
                  height={800}
                  title={{
                    visible: true,
                    text: 'Analysis by category (UAH)',
                  }}
                  statistic={{
                    visible: true,
                    totalLabel: 'Total in UAH',
                  }}
                  forceFit
                  radius={0.95}
                  padding="auto"
                  angleField="value"
                  colorField="type"
                />
              </Spin>
            </Col>
          </Row>
        </Col>
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
          <CategoryOperations
            from={from?.unix()}
            to={to?.unix()}
            walletIds={
              data?.wallets
                .map((w) => w.id)
                .filter((id) => !walletIgnoreIds.includes(id)) || []
            }
            categoryId={
              data?.statisticByCategory.find((s) => s.category.id === selected)!
                .category.id!
            }
          />
        </Drawer>
      )}
    </>
  );
};
