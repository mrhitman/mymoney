import { Breadcrumb, Row, Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GetWalletsQuery,
  useDeleteWalletMutation,
  useGetWalletsQuery,
} from 'src/generated/graphql';
import AddWallet from './AddWallet';
import EmptyWalletCard from './EmptyWalletCard';
import UpdateWallet from './UpdateWallet';
import WalletCard from './WalletCard';

export const Accounting: FC = () => {
  const [state, setState] = useState<{
    name: 'edit' | 'create';
    wallet?: GetWalletsQuery['wallets'][number];
  } | null>(null);
  const [deleteWallet] = useDeleteWalletMutation();
  const { loading, data, refetch } = useGetWalletsQuery();
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
              onEdit={async () => setState({ name: 'edit', wallet })}
              onDelete={async (id) => {
                await deleteWallet({ variables: { id } });
                await refetch();
              }}
              loading={loading}
            />
          ))}
          <EmptyWalletCard onClick={() => setState({ name: 'create' })} />
          <AddWallet
            visible={state?.name === 'create'}
            onClose={async () => {
              setState(null);
              await refetch();
            }}
          />
          {state?.wallet && (
            <UpdateWallet
              visible={state?.name === 'edit'}
              wallet={state?.wallet}
              onClose={async () => {
                setState(null);
                await refetch();
              }}
            />
          )}
        </Row>
      </Skeleton>
    </>
  );
};

export default Accounting;
