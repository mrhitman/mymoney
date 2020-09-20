import { SyncOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button, Row, Col, Spin } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionType, useAnalysByCategoriesQuery } from 'src/generated/graphql';
import { VictoryPie } from 'victory';

export const AnalysisByCategory: FC = () => {
  const [type, setType] = useState<TransactionType>(TransactionType.Income);
  const { t } = useTranslation();
  const { loading, data, error, refetch } = useAnalysByCategoriesQuery({ variables: { type } });

  useEffect(() => {
    refetch({ type });
  }, [type]);

  return (
    <>
      <Row>
        <Col>
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
            <Button className="ant-dropdown-link" onClick={() => refetch({ type })}>{type}</Button>
          </Dropdown>
          <Button >
            <SyncOutlined />
          </Button>
        </Col>
      </Row>
      <Row align="middle" justify="center" gutter={[10, 10]} >
        <Col span={12}>
          <Spin spinning={loading}>
            <VictoryPie
              colorScale={'qualitative'}
              style={{ labels: { fill: 'black' } }}
              innerRadius={80}
              labelRadius={120}
              cornerRadius={2}
              labelPosition={'centroid'}
              labels={({ datum }) => `${t(datum.x)}`}
              data={data?.statisticByCategory.map(data => ({
                x: data.category.name,
                y: Math.abs(data.amount)
              }))}
            />
          </Spin>
        </Col>
      </Row>
    </>
  );
}

