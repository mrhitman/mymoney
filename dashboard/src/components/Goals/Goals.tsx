import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, List, Row, Skeleton } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetGoalsQuery } from 'src/generated/graphql';
import { AddGoal } from './AddGoal';

export const Goals: FC = () => {
  const { t } = useTranslation();
  const { data: goals, loading } = useGetGoalsQuery();

  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">{t('home')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('goals')}</Breadcrumb.Item>
      </Breadcrumb>
      <Skeleton loading={loading}>
        <Row gutter={16}>
          <Col span={12}>
            <List
              itemLayout="horizontal"
              dataSource={goals?.goals}
              renderItem={(goal) => (
                <List.Item
                  actions={[
                    <Button icon={<SaveOutlined />} key="save">
                      Save to goal
                    </Button>,
                    <Button icon={<DeleteOutlined />} key="save">
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={goal.name}
                    description={`To collect ${goal.goal} ${goal.currency.symbol}`}
                  />
                </List.Item>
              )}
            />
            <AddGoal />
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};
