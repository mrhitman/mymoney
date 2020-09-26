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
  Table,
} from 'antd';
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionType,
  useAnalysByCategoriesQuery,
} from 'src/generated/graphql';
import { VictoryPie, VictoryLegend, VictoryLabel } from 'victory';

export const AnalysisByCategory: FC = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.Outcome);
  const [from, setFrom] = useState<number | undefined>(
    moment().startOf('month').unix(),
  );
  const [focused, setFocused] = useState<any | undefined>();
  const [selected, setSelected] = useState<any | undefined>();
  const [walletIds, setWalletIds] = useState<string[]>([]);
  const [to, setTo] = useState<number | undefined>(moment().unix());
  const { t } = useTranslation();
  const { loading, data, refetch } = useAnalysByCategoriesQuery({
    variables: { type, from, to },
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });
  const total =
    data?.statisticByCategory.reduce(
      (acc, item) => acc + Math.abs(item.amount),
      0,
    ) || 0;

  const doRefetch = () => {
    refetch({
      type,
      from,
      to,
      walletIds: data?.wallets
        .map((w) => w.id)
        .filter((id) => !walletIds.includes(id)),
    });
  };

  useEffect(doRefetch, [type]);
  return (
    <>
      <Row>
        <Col span={6}>
          <Row>
            <Col>
              <DatePicker.RangePicker
                showTime
                onCalendarChange={(values) => {
                  setFrom(values?.[0]?.unix());
                  setTo(values?.[1]?.unix());
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
                      checked={!walletIds.includes(wallet.id)}
                      onChange={(e) =>
                        setWalletIds(
                          !e.target.checked
                            ? [...walletIds, wallet.id]
                            : walletIds.filter((id) => id !== wallet.id),
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
                title="Spends by categories"
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
                    isFocused: data.category.name === focused?.datum.x,
                    amount: data.amount,
                  }))}
                  labels={({ datum }) =>
                    datum.isFocused || datum.y / total > 0.14 ? t(datum.x)! : ''
                  }
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
      <Drawer
        placement="bottom"
        visible={!!selected}
        height={300}
        keyboard
        closable
        onClose={() => {
          setSelected(null);
        }}
      >
        <Table dataSource={[]} />
      </Drawer>
    </>
  );
};
