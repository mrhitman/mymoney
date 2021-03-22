import { Breadcrumb, Col, Row, Skeleton } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetGoalsQuery } from 'src/generated/graphql';
import { AddGoal } from './AddGoal';

export const Goals: FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useGetGoalsQuery();

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
          <Col>
            <AddGoal />
            <pre>{JSON.stringify(data)}</pre>
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};
