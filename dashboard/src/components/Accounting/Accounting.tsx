import { Breadcrumb, Row, Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetWalletsQuery } from 'src/generated/graphql';
import AddWallet from './AddWallet';
import EmptyWalletCard from './EmptyWalletCard';
import WalletCard from './WalletCard';

export const Accounting: FC = () => {
  const [visible, setVisible] = useState(false);
  const { loading, data, refetch } = useGetWalletsQuery({
    context: {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  });
  const wallets = data ? data.wallets : [];
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">{t('home')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('wallets')}</Breadcrumb.Item>
      </Breadcrumb>
      <Skeleton loading={loading}>
        <Row gutter={16}>
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onDelete={() => refetch()}
              loading={loading}
            />
          ))}
          <EmptyWalletCard onClick={() => setVisible(true)} />
          <AddWallet
            visible={visible}
            onClose={() => {
              setVisible(false);
              refetch();
            }}
          />
        </Row>
      </Skeleton>
    </>
  );
};

export default Accounting;
