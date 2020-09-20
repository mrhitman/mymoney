import { SyncOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button, Row, Col, Spin, DatePicker } from 'antd';
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionType, useAnalysByCategoriesQuery } from 'src/generated/graphql';
import { VictoryPie } from 'victory';

export const AnalysisByCategory: FC = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.Outcome);
  const [from, setFrom] = useState<number | undefined>(moment().startOf('month').unix());
  const [to, setTo] = useState<number | undefined>(moment().unix());
  const { t } = useTranslation();
  const { loading, data, refetch } = useAnalysByCategoriesQuery({ variables: { type, from, to } });

  useEffect(() => {
    refetch({ type, from, to });
  }, [type]);

  return (
    <>
      <Row >
        <Col span={6} >
          <DatePicker.RangePicker showTime onCalendarChange={(values) => {
            setFrom(values?.[0]?.unix());
            setTo(values?.[1]?.unix());
          }} />
          <Dropdown
            overlay={() => (
              <Menu>
                <Menu.Item key="income" onClick={() => setType(TransactionType.Income)} >
                  Income
              </Menu.Item>
                <Menu.Item key="outcome" onClick={() => setType(TransactionType.Outcome)} >
                  Outcome
              </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
            placement="bottomCenter"
          >
            <Button className="ant-dropdown-link" onClick={() => refetch({ type, from, to })}>{type}</Button>
          </Dropdown>
          <Button >
            <SyncOutlined />
          </Button>
        </Col>
        <Col span={18} >
          <Row align="middle" justify="center" gutter={[10, 10]} >
            <Col span={18}>
              <Spin spinning={loading}>
                <VictoryPie
                  colorScale={'qualitative'}
                  style={{ labels: { fill: 'black' } }}
                  innerRadius={60}
                  labelRadius={70}
                  cornerRadius={2}
                  labelPosition={'centroid'}
                  labels={({ datum }) => `${t(datum.x)} (${datum.amount?.toFixed(2)})`}
                  data={data?.statisticByCategory
                    // .filter(data => data.category.name !== 'SYSTEM_EMPTY')
                    .map(data => ({
                      x: data.category.name,
                      y: Math.abs(data.amount),
                      amount: data.amount,
                    }))}
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

