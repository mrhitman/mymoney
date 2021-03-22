import { Breadcrumb, Skeleton, Row, Col } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetGoalsQuery } from 'src/generated/graphql';

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
            <pre>{JSON.stringify(data)}</pre>
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};
