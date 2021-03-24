import React, { FC, useState } from 'react';
import { TransactionType } from 'src/generated/graphql';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { TransactionForm, TransactionFormTypes } from './TransactionForm';
import { useFormik } from 'formik';

interface Props {
  type: TransactionType;
}

export const AddTransaction: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: TransactionType.Income,
      date: new Date(),
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
        Create transaction
      </Button>
      <Modal
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
