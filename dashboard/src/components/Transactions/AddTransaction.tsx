import React, { FC, useState } from 'react';
import { TransactionType } from 'src/generated/graphql';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { TransactionForm, TransactionFormTypes } from './TransactionForm';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

interface Props {
  type: TransactionType;
}

export const AddTransaction: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: TransactionType.Income,
      date: moment(),
      description: '',
    } as TransactionFormTypes,
    onSubmit: (data) => {
      console.log(data);
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
