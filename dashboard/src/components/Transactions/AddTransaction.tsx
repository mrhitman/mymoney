import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionType,
  useCreateTransactionMutation,
} from 'src/generated/graphql';
import { TransactionForm, TransactionFormTypes } from './TransactionForm';

interface Props {
  type: TransactionType;
}

export const AddTransaction: FC<Props> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [createTransaction] = useCreateTransactionMutation();
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type,
      date: moment(),
      description: '',
    } as TransactionFormTypes,
    onSubmit: async (data) => {
      await createTransaction({
        variables: {
          transactionCreateData: {
            type,
            amount: data.amount,
            description: data.description,
            categoryId: data.categoryId!,
            currencyId: data.currencyId!,
            sourceWalletId: data.sourceWalletId,
            destinationWalletId: data.destinationWalletId,
            date: moment(data.date).unix(),
          },
        },
      });
      formik.resetForm();
    },
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        {t(`add_${formik.values.type.toLowerCase()}`)}
      </Button>
      <Modal
        width={720}
        title={t(`add_${formik.values.type.toLocaleLowerCase()}`)}
        visible={visible}
        onOk={() => {
          setVisible(false);
          formik.handleSubmit();
        }}
        onCancel={() => {
          setVisible(false);
          formik.resetForm();
        }}
      >
        <TransactionForm formik={formik} />
      </Modal>
    </>
  );
};
