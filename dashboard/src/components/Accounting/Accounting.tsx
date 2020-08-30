import { useQuery } from '@apollo/client';
import {
  Skeleton,
  Card,
  List,
  Typography,
  Divider,
  Avatar,
  Row,
  Col,
} from 'antd';
import { loader } from 'graphql.macro';
import { GetWalletsQuery } from 'src/generated/graphql';
import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const WalletsQuery = loader('src/queries/wallets.graphql');

export const icons: Record<string, string> = {
  'monobank-black':
    'https://www.monobank.com.ua/resources/static-1/img/logo-medium-192x192.png',
  'Privat24 Card':
    'https://xpc.com.ua/image/catalog/general/page/a_icon/privat24.svg',
  'default-card':
    'https://www.nicepng.com/png/full/104-1044427_png-library-download-drawing-at-getdrawings-com-free.png',
};

const layout = { xs: 24, sm: 24, md: 12, lg: 6 };

export const Accounting: FC = () => {
  const { loading, error, data } = useQuery<GetWalletsQuery>(WalletsQuery);
  const wallets = data ? data.wallets : [];

  return (
    <Skeleton loading={loading}>
      <Row gutter={16}>
        {wallets.map((wallet) => {
          return (
            <Col id={wallet.id} {...layout}>
              <Card hoverable style={{ width: 300, marginTop: 16 }} loading={loading}>
                <Link to={`/operations/${wallet.id}`}>
                  <Card.Meta
                    title={wallet.name.slice(0, 6) + '******'}
                    description={wallet.description}
                    avatar={<Avatar src={icons[wallet.type || 'default-card']} />}
                  />
                  <Divider />
                  <List
                    dataSource={wallet.pockets}
                    renderItem={(pocket) => (
                      <Typography>
                        {pocket.currency.symbol} {pocket.amount}{' '}
                        {pocket.currency.name}
                      </Typography>
                    )}
                  />
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Skeleton>
  );
};

export default Accounting;
