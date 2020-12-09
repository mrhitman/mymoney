import { Descriptions } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { useGetTransactionQuery } from '../../generated/graphql';
import CategoryIcon from '../misc/CategoryIcon';
import { TransactionAmount } from './TransactionAmount';

export const ViewTransaction: FC = () => {
  const { params } = useRouteMatch<{ trxId: string }>();
  const { t } = useTranslation();
  const { data } = useGetTransactionQuery({
    variables: {
      id: params.trxId,
    },
  });
  const transaction = data?.transaction;

  if (!transaction) {
    return <div>No such transaction found</div>
  }

  return <Descriptions title={`Transaction "${transaction.id}" details`} column={1} bordered>
    {transaction.sourceWallet && <Descriptions.Item label={t('wallet')}>
      {transaction.sourceWallet?.description}
    </Descriptions.Item>}
    {transaction.destinationWallet && <Descriptions.Item label={t('wallet')}>
      {transaction.destinationWallet?.description}
    </Descriptions.Item>}
    <Descriptions.Item label={t('currency')}>
      {transaction.currency.description}
    </Descriptions.Item>
    <Descriptions.Item label={t('category')}>
      <CategoryIcon icon={transaction.category.icon} /> {t(transaction.category.name)}
    </Descriptions.Item>
    <Descriptions.Item label={t('description')}>
      {transaction.description}
    </Descriptions.Item>
    <Descriptions.Item label={t('additional')}>
      <pre>
        {JSON.stringify(transaction.meta, null, 2)}
      </pre>
    </Descriptions.Item>
    <Descriptions.Item label={t('amount')}>
      {<TransactionAmount record={transaction} />}
    </Descriptions.Item>
    <Descriptions.Item label={t('date')}>
      {moment(transaction.date).format('LLL')}
    </Descriptions.Item>
  </Descriptions>;
};

export default ViewTransaction;
