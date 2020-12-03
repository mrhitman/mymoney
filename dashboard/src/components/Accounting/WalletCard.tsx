import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, List, Row, Typography, Popconfirm } from 'antd';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetWalletsQuery, useDeleteWalletMutation } from 'src/generated/graphql';

export const icons: Record<string, string> = {
  'monobank-black': 'https://www.monobank.com.ua/resources/static-1/img/logo-medium-192x192.png',
  'Privat24 Card': 'https://xpc.com.ua/image/catalog/general/page/a_icon/privat24.svg',
  'default-card':
    'https://www.nicepng.com/png/full/104-1044427_png-library-download-drawing-at-getdrawings-com-free.png',
};
const layout = { xs: 24, sm: 24, md: 12, lg: 6 };

type Wallet = Required<GetWalletsQuery>['wallets'][number];
interface WalletCardProps {
  wallet: Wallet;
  loading: boolean;
  onDelete: (id: string) => void;
}

const WalletCard: FC<WalletCardProps> = ({ wallet, loading, onDelete }) => {
  const [edit, setEdit] = useState(false);
  const [deleteWallet] = useDeleteWalletMutation();

  return (
    <Col key={wallet.id} id={wallet.id} {...layout}>
      <Card hoverable style={{ width: 300, marginTop: 16 }} loading={loading}>
        <Link to={`/operations/${wallet.id}`}>
          <Card.Meta
            title={wallet.name}
            description={wallet.description}
            avatar={<Avatar src={icons[wallet.type || 'default-card']} />}
          />
          <Row
            style={{
              float: 'right',
              marginTop: 14,
              marginBottom: 8,
              marginRight: 8,
            }}
          >
            <Col>
              <Button
                icon={<EditOutlined />}
                onClick={(e) => {
                  setEdit(true);
                  e.preventDefault();
                }}
              />
              <Popconfirm
                title="Are you sure to delete this wallet?"
                onConfirm={async (e) => {
                  e?.preventDefault();
                  await deleteWallet({ variables: { id: wallet.id } });
                  onDelete(wallet.id);
                }}
                okText="Yes, I want"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} />
              </Popconfirm>
            </Col>
          </Row>
          <Divider />
          <List
            dataSource={wallet.pockets}
            renderItem={(pocket) => (
              <Row>
                <Col offset={1}>
                  <Typography>
                    {pocket.currency.symbol} {pocket.amount} {pocket.currency.name}
                  </Typography>
                </Col>
              </Row>
            )}
          />
        </Link>
      </Card>
    </Col>
  );
};

export default WalletCard;
