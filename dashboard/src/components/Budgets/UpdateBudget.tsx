import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import BudgetForm from './BudgetForm';
import { useFormik } from 'formik';

export const UpdateBudget: FC = () => {
  const [visible, setVisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      deadline: new Date(),
    },
    onSubmit: console.log,
  });

  return (
    <>
      <Button
        icon={<EditOutlined />}
        size="large"
        style={{ width: 200 }}
        onClick={() => setVisible(true)}
      >
        Update budget
      </Button>
      <Modal
        visible={visible}
        title="Update budget"
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <BudgetForm onSubmit={console.log} />
      </Modal>
    </>
  );
};
