import { AppstoreAddOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row, Skeleton, Typography } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useGetConnectorsQuery } from 'src/generated/graphql';
import AddConnector from './AddConnector';

const layout = { xs: 17, sm: 17, md: 10, lg: 5 };
const images: Record<string, string> = {
  privat24:
    'https://pbs.twimg.com/profile_images/660498508567461888/ChmxAbO6_400x400.png',
  monobank:
    'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/fc/e0/4a/fce04ad4-bbed-abb4-e5c0-ced1b2a31e72/source/256x256bb.jpg',
};

export const Connectors: React.FC = () => {
  let { loading, data, refetch } = useGetConnectorsQuery({
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });
  const [showForm, setShowForm] = useState(false);

  const connectors = data ? data.connectors : [];
  return (
    <Skeleton loading={loading}>
      <Row gutter={[16, 16]}>
        {connectors.map((connector) => {
          return (
            <Col id={connector.id} {...layout}>
              <Card
                hoverable
                loading={loading}
                style={{ width: 256 }}
                cover={<img alt="" src={images[connector.type]} />}
              >
                <Card.Meta
                  title={connector.type}
                  description={connector.description}
                />
                <Divider />
                <Typography>
                  Added:{' '}
                  {moment
                    .unix(Number(connector.createdAt) / 1000)
                    .format('L HH:mm')}
                </Typography>
              </Card>
            </Col>
          );
        })}
        <Col {...layout}>
          <Card
            hoverable
            loading={loading}
            style={{ width: 256 }}
            onClick={() => setShowForm(true)}
          >
            <Row justify="center" align="middle" style={{ height: 278 }}>
              <AppstoreAddOutlined style={{ fontSize: 160 }} />
            </Row>
            <Card.Meta title={'Add connector'} />
            <Divider />
            <AddConnector
              show={showForm}
              onSubmit={refetch}
              onClose={() => setShowForm(false)}
            />
          </Card>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default Connectors;
